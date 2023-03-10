import { BoxModal, ModalContent } from './Modal.styled';
import  WorkHours from './WorkHours'

function Modal({workDays, onClick}) {

  return (
    <div >
      <BoxModal onClick={onClick}>
        <ModalContent>
          {workDays ?
            (<WorkHours workDays={workDays}/>) :
            (<p>Don`t have working hours</p>)}
        </ModalContent>
      </BoxModal>
    </div>
  );
}

export default Modal;
