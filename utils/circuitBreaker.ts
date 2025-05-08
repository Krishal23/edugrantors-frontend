enum State {
    CLOSED,
    OPEN,
    HALF_OPEN
}

export class CircuitBreaker {
    private state: State;
    private failureCount: number;
    private successCount: number;
    private lastFailureTime: number;
    private readonly failureThreshold: number;
    private readonly resetTimeout: number;
    private readonly successThreshold: number;

    constructor(
        failureThreshold: number = 5,
        resetTimeout: number = 60000,
        successThreshold: number = 2
    ) {
        this.state = State.CLOSED;
        this.failureCount = 0;
        this.successCount = 0;
        this.lastFailureTime = 0;
        this.failureThreshold = failureThreshold;
        this.resetTimeout = resetTimeout;
        this.successThreshold = successThreshold;
    }

    async execute<T>(operation: () => Promise<T>): Promise<T> {
        if (this.state === State.OPEN) {
            if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
                this.state = State.HALF_OPEN;
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }

        try {
            const result = await operation();
            this.handleSuccess();
            return result;
        } catch (error) {
            this.handleFailure();
            throw error;
        }
    }

    private handleSuccess(): void {
        if (this.state === State.HALF_OPEN) {
            this.successCount++;
            if (this.successCount >= this.successThreshold) {
                this.reset();
            }
        }
    }

    private handleFailure(): void {
        this.failureCount++;
        this.lastFailureTime = Date.now();

        if (this.state === State.CLOSED && this.failureCount >= this.failureThreshold) {
            this.state = State.OPEN;
        } else if (this.state === State.HALF_OPEN) {
            this.state = State.OPEN;
        }
    }

    private reset(): void {
        this.state = State.CLOSED;
        this.failureCount = 0;
        this.successCount = 0;
    }

    getState(): string {
        return State[this.state];
    }
}

// Create circuit breaker instances for different services
export const emailCircuitBreaker = new CircuitBreaker(3, 30000); // More lenient settings for email
export const cloudinaryCircuitBreaker = new CircuitBreaker(5, 60000); // Standard settings for cloudinary
export const redisCircuitBreaker = new CircuitBreaker(3, 15000, 3); // Quick recovery for Redis