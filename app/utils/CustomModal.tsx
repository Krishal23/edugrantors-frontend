import React, { FC } from 'react';
import { Modal, Box } from '@mui/material';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem?: number;
    component: React.ElementType; // Updated this type to React.ElementType for components
    setRoute?: (route: string) => void;
    isResend?:boolean;
    setIsResend?:(isResend:boolean)=>void;
    submissionDataStore?:any;
    setSubmissionDataStore?:(submissionDataStore:any)=>void
};

const CustomModal: FC<Props> = ({ open, setOpen, component: Component, setRoute,isResend,setIsResend,submissionDataStore, setSubmissionDataStore}) => {
    if (!open) return null;

    
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className="
                    absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 
                    bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none 
                    flex justify-center items-center
                    md:w-[520px] 
                    xxs:w-[90vw] 
                    
                "
            >
                <Component setOpen={setOpen} setRoute={setRoute} isResend={isResend} setIsResend={setIsResend} submissionDataStore={submissionDataStore} setSubmissionDataStore={setSubmissionDataStore} />
            </Box>
        </Modal>
    );
};

export default CustomModal;
