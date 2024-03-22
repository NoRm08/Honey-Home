import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  List,
  ListItem,
  ListIcon,
  Input,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import { ArrowRightIcon, Icon } from '@chakra-ui/icons';
import { IoCheckmarkOutline, IoPersonAdd } from 'react-icons/io5';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ChangeSkillMaster from '../UI/masterPage/ChangeSkillMaster';
import type { Skill } from '../../types/auth';
import ChangeInfoMaster from '../UI/masterPage/ChangeInfoMaster';
import { editImgMasterThunk } from '../../redux/master/masterThanck';
import MasterOrders from '../UI/masterPage/MasterOrders';

export default function MasterPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const masters = useAppSelector((store) => store.masters.masters);
  const selectedMaster = masters.find((master) => master.email === user.email);
  // Модалка для навыков
  // console.log('<><><>>>', selectedMaster);

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  // Модалка для изменения информации
  const [modalInfo, setModalInfo] = useState(false);
  const [masterText, setMasterText] = useState(false);

  const [masterSkills, setMasterSkills] = useState<Skill['name'][]>(
    selectedMaster?.MasterSkills.map((masterSkill) => masterSkill.Skill.name) || [],
  );
  useEffect(() => {
    if (!masterSkills.length && selectedMaster?.MasterSkills) {
      setMasterSkills(selectedMaster?.MasterSkills.map((skill) => skill.Skill.name));
    }
  }, [selectedMaster]);
  // Функции открытия/закрытия для модалок
  const handleButtonClick = (): void => {
    setIsComponentVisible(!isComponentVisible);
  };
  const modalClick = (): void => {
    setModalInfo(!modalInfo);
  };
  const masterTextClick = (): void => {
    setMasterText(!masterText);
  };

  const [imgMaster, setImgMaster] = useState<string>('');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <SimpleGrid
          spacing={10}
          templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
          style={{ flexDirection: 'column' }}
        >
          {selectedMaster && (
            <Card style={{ textAlign: 'center', paddingTop: '50px' }}>

              <CardHeader>
                <Heading size="md">
                  <Flex justify="center">
                    <Avatar
                      size="xl"
                      src={selectedMaster.img}
                      mb={4}
                      pos="relative"
                      _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                      }}
                    />

                    <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                      <Icon
                        as={IoPersonAdd}
                        boxSize={4}
                        color="blue.500"
                        _hover={{ color: 'blue.600' }}
                      />
                      <Input
                        id="image-upload"
                        type="file"
                        onChange={(e) => setImgMaster(e.target?.files[0])}
                        accept="image/*"
                        display="none"
                      />
                    </label>

                    <Button
                      onClick={async (): Promise<void> => {
                        const data = new FormData();
                        data.append('avatar', imgMaster);
                        const res = await axios.post('http://localhost:3001/api/upload', data, {
                          headers: { 'Content-Type': 'multipart/form-data' },
                        });
                        const formData = {
                          id: selectedMaster?.id,
                          img: res.data.path,
                        };
                        void dispatch(editImgMasterThunk(formData));
                      }}
                      backgroundColor="white"
                    >
                      <Icon as={IoCheckmarkOutline} boxSize={4} color="green.500" mb="5" />
                    </Button>
                  </Flex>
                  &nbsp;{selectedMaster.name}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  <strong>Email:</strong> {selectedMaster.email}
                </Text>
                <Text>
                  <strong>Телефон:</strong> {selectedMaster.telephone}
                </Text>
                <Text>
                  <strong>Опыт:</strong> {selectedMaster.experience}
                </Text>
                <Text>
                  <strong>Рейтинг:</strong> {selectedMaster.raiting}
                </Text>
              </CardBody>
            </Card>
          )}
        </SimpleGrid>
        <div style={{ marginTop: '20px', textAlign: 'start', paddingTop: '50px' }}>
          <Heading size="md" mb="4">
            Навыки
          </Heading>
          <List spacing={3}>
            {masterSkills.map((masterSkill, index) => (
              // if (masterSkill?.Skill?.name) return null;
              <>
                {console.log('<><><><><><><><', masterSkill)}
                <ListItem key={index}>
                  <ListIcon as={ArrowRightIcon} color="blue.500" />
                  {masterSkill}
                </ListItem>
              </>
            ))}
            {masterSkills.length < 4 && (
              <Button leftIcon={<MdSettings />} colorScheme="blue" onClick={handleButtonClick}>
                Добавить навык
              </Button>
            )}
            {masterSkills.length < 4 && isComponentVisible && (
              <ChangeSkillMaster
                isComponentVisible={isComponentVisible}
                handleButtonClick={handleButtonClick}
                setMasterSkills={setMasterSkills}
                masterSkills={masterSkills}
              />
            )}
          </List>
          <Heading size="md" mb="4" style={{ textAlign: 'start' }}>
            Редактирование данных
          </Heading>{' '}
          <List spacing={3}>
            <Button leftIcon={<MdSettings />} colorScheme="blue" onClick={modalClick}>
              Изменить данные
            </Button>
            <ChangeInfoMaster
              modalClick={modalClick}
              selectedMaster={selectedMaster}
              modalInfo={modalInfo}
              setModalInfo={setModalInfo}
            />
          </List>
        </div>
      </div>
      <MasterOrders selectedMaster={selectedMaster} />
    </>
  );
}
