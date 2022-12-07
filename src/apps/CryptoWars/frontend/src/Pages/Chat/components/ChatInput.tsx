import React from 'react';
import { Button, Grid } from '@mui/material';

const styles = {
  border: {
    borderTopWidth: '1',
    borderTopStyle: 'solid',
    borderTopColor: '#ddd'
  },
  inputStyle: {
    border: 'none',
    fontSize: '16',
    outline: 'none',
    padding: '30',
    width: '100%'
  }
};

interface ChatInputProps {
  inputStyles?: object;
  inputPlaceholder?: string;
  sendMessage: any;
  setMessage: any;
}

const ChatInput = (props: ChatInputProps) => {
  const { inputStyles, inputPlaceholder } = props;
  return (
    <Grid container item xs={12} style={styles.border}>
      <Grid item xs={10}>
        <input
          type="text"
          style={inputStyles || styles.inputStyle}
          placeholder={inputPlaceholder}
          onChange={e => {
            props.setMessage(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={props.sendMessage}>Send</Button>
      </Grid>
    </Grid>
  );
};

export default ChatInput;
