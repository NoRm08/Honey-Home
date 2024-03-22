// import { ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
// import React from 'react';
// import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';

// type MasterTextProps = {
//   setMasterText: (isVisible: boolean) => void;
//   masterTextClick: () => void;
// };

// export default function MasterText({
//   setMasterText,
//   masterTextClick,
// }: MasterTextProps): JSX.Element {
//   return (
//     <Modal isOpen={!!masterTextContent} onClose={masterTextClick}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalCloseButton />
//         <ModalBody pb={6}>
//           <div>{masterTextContent}</div>
//           <ModalFooter>
//             <Button variant="ghost" onClick={masterTextClick}>
//               Отмена
//             </Button>
//           </ModalFooter>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// }
