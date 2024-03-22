import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import type { EditMasterFormData, MasterType } from '../../../types/auth';
import { useAppDispatch } from '../../../redux/hooks';
import { editMasterThanck } from '../../../redux/master/masterThanck';

type ChangeSkillMasterProps = {
  modalClick: () => void;
  modalInfo: boolean;
  selectedMaster: MasterType;
  setModalInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChangeSkillMaster({
  modalClick,
  modalInfo,
  selectedMaster,
  setModalInfo,
}: ChangeSkillMasterProps): JSX.Element {
  // console.log('selected', selectedMaster);
  const dispatch = useAppDispatch();
  const [masterData, setMasterData] = useState({
    name: '',
    telephone: '',
    experience: '',
  });

  useEffect(() => {
    if (selectedMaster) {
      setMasterData({
        name: selectedMaster.name || '',
        telephone: selectedMaster.telephone || '',
        experience: selectedMaster.experience || '',
      });
    }
  }, [selectedMaster]);

  return (
    <Modal isOpen={modalInfo} onClose={modalClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement & EditMasterFormData>) => {
              e.preventDefault();
              if (!selectedMaster) {
                console.error('selectedMaster is undefined');
                return;
              }
              const formData = Object.fromEntries(new FormData(e.currentTarget));
              console.log(formData);
              void dispatch(editMasterThanck({ formData, id: selectedMaster.id }));
              setModalInfo(false);
            }}
          >
            <FormControl>
              <FormLabel style={{ textAlign: 'center' }}>Изменить данные</FormLabel>
              <Input
                type="text"
                name="name"
                value={masterData.name}
                placeholder="Имя"
                mb={4}
                width="100%"
                onChange={(e) => setMasterData({ ...masterData, name: e.target.value })}
              />
              <Input
                type="text"
                name="telephone"
                value={masterData.telephone}
                placeholder="Телефон"
                mb={4}
                width="100%"
                onChange={(e) => setMasterData({ ...masterData, telephone: e.target.value })}
              />
              <Input
                type="text"
                name="experience"
                value={masterData.experience}
                placeholder="Опыт"
                mb={4}
                width="100%"
                onChange={(e) => setMasterData({ ...masterData, experience: e.target.value })}
              />
            </FormControl>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Сохранить
              </Button>
              <Button variant="ghost" onClick={modalClick}>
                Отмена
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ChangeSkillMaster;
