import {CardModal} from "@legion-hq/components";
import {useListBuilder} from "@legion-hq/hooks/list/useList";

export function ListModals() {
  const {isModalOpen, modalContent, handleCloseModal} = useListBuilder();
  return (
    <CardModal id={modalContent} isOpen={isModalOpen} handleClose={handleCloseModal} />
  );
}
