import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useCallback, useState } from 'react';
import { Form } from '../client/Form';
import { IProcessDataResponse } from '../types';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ProcessedData } from '../client/ProcessedData';

export default function Home() {
  const [data, setData] = useState<IProcessDataResponse>({
    orderedResult: [],
    uniqueOrderedResult: [],
  });
  const [loading, setLoading] = useState(true);

  const submitForm = useCallback((file: File) => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      setLoading(true);

      const responseData = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      setData(responseData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Grid container spacing={3} alignItems="center">
        <Head>
          <title>Smart FE Test</title>
          <meta name="description" content="Website visit coding test" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" align="center">
            Smart FE Test
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Select A File" />
            <CardContent>
              <Form handleSubmit={submitForm}></Form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Processed Data" />
            <CardContent>
              {loading ? (
                <Skeleton data-testid="data-skeleton">
                  <ProcessedData data={data} />
                </Skeleton>
              ) : (
                <ProcessedData data={data} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
