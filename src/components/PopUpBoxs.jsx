import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { getLanguage } from '../utils/utils';

export default function PopUpBox({content=(<div>Hey</div>)}) {
  let language = getLanguage();
  let direction= language=="HE"?"rtl":"ltr";
    const [layout, setLayout] = React.useState('center');
    return (
      <React.Fragment>
        <Modal open={!!layout} onClose={() => setLayout(undefined)}>
          <ModalDialog layout={layout} sx={{direction:direction }} >
            <ModalClose/>
            {content}
          </ModalDialog>
        </Modal>
      </React.Fragment>
    );
}
