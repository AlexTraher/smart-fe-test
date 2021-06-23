import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useCallback, useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File>();

  const submitForm = useCallback(
    (event) => {
      event.preventDefault();
      if (!selectedFile) {
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);

      fetch('/api/process', {
        method: 'POST',
        body: formData,
      });
    },
    [selectedFile]
  );

  const handleFileChange = useCallback(
    (event) => {
      event.preventDefault();
      setSelectedFile(event.target.files[0]);
    },
    [setSelectedFile]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart FE Test</title>
        <meta name="description" content="Website visit coding test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={submitForm}>
        <input type="file" name="filename" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
