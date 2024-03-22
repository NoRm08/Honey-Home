import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  useColorModeValue,
  Text,
  Container,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

type SimpleAccordionPropsType = {
  name: string;
  text: string;
};

export default function SimpleAccordion({ name, text }): JSX.Element {
  return (
    <Container width="250px">
      <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
        <AccordionItem>
          <AccordionButton display="flex" alignItems="center" justifyContent="space-between" p={4}>
            <Text fontSize="md">{name}</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="gray.500">{text}</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
