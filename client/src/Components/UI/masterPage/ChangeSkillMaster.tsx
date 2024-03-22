import React, { useState, useEffect } from 'react';
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
import MasterService from '../../../services/masterService';
import { useAppSelector } from '../../../redux/hooks';
import type { MasterSkills, MasterType, Skill } from '../../../types/auth';

type ChangeSkillMasterProps = {
  isComponentVisible: boolean;
  handleButtonClick: () => void;
  setMasterSkills: React.Dispatch<React.SetStateAction<Skill['name'][]>>;
  masterSkills: Skill['name'][];
};

function ChangeSkillMaster({
  isComponentVisible,
  handleButtonClick,
  setMasterSkills,
  masterSkills,
}: ChangeSkillMasterProps): JSX.Element {
  const skillOptions = useAppSelector((store) => store.skills);
  const filterSkills = skillOptions.filter((skill) => !masterSkills.includes(skill.name));
  const user = useAppSelector((store) => store.auth.user);
  const masters = useAppSelector((store) => store.masters.masters);
  const selectedMaster = masters.find((master) => master.email === user.email) as MasterType;

  console.log('selected', selectedMaster);

  const { onClose } = useDisclosure();
  const initialRef = React.useRef<HTMLInputElement>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');

  const handleSave = async (): Promise<void> => {
    try {
      const response = await MasterService.addSkill(selectedMaster.id, selectedSkillId);
      setSelectedSkillId('');
      setMasterSkills((prev) => [...prev, response.skill.Skill.name]);
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
              {filterSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => void handleSave()}>
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
