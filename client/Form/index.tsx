import { ChangeEvent, FormEvent, useState } from 'react';
import { Input, Button, Grid, FormLabel } from '@material-ui/core';

interface IFormProps {
  handleSubmit: (file: File) => void;
}

export const Form = ({ handleSubmit }: IFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    handleSubmit(selectedFile);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    /* istanbul ignore if: TS narrowing */
    if (!event.target.files) {
      return;
    }

    setSelectedFile(event.target.files[0]);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} alignItems="center" direction="column">
        <Grid item xs={12}>
          <FormLabel htmlFor="fileUpload">File upload</FormLabel>
        </Grid>
        <Grid item xs={12}>
          <Input
            id="fileUpload"
            type="file"
            name="filename"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
