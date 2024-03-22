import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import MasterService from '../../services/masterService';
import { useAppSelector } from '../../redux/hooks';

type ChangeSkillMasterProps = {
  isComponentVisible: boolean;
  handleButtonClick: () => void;
};

function ChangeSkillMaster({
  isComponentVisible,
  handleButtonClick,
}: ChangeSkillMasterProps): JSX.Element {
  const skillOptions = useAppSelector((store) => store.skills);
  const user = useAppSelector((store) => store.auth.user);
  const masters = useAppSelector((store) => store.masters.masters);
  const selectedMaster = masters.find((master) => master.email === user.email);

  const { onClose } = useDisclosure();
  const initialRef = React.useRef<HTMLInputElement>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');

  const handleSave = async () => {
    try {
      console.log('TYTYTYTYT Master', selectedMaster.id, 'TYT SKILL', selectedSkillId);
      await MasterService.addSkill(selectedMaster.id, selectedSkillId);
      setSelectedSkillId('');
      handleButtonClick();
    } catch (error) {
      console.error('Ошибка при сохранении навыка:', error);
    }
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isComponentVisible} onClose={handleButtonClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить навык</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Выберите навык</FormLabel>
            <Select
              placeholder="Выберите навык"
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
            >
              {skillOptions.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Сохранить
          </Button>
          <Button variant="ghost" onClick={handleButtonClick}>
            Отмена
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ChangeSkillMaster;
