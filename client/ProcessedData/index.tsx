import { MouseEvent, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { IProcessDataResponse } from '../../types';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { DataGrid, GridColDef, GridRowData } from '@material-ui/data-grid';

interface IProcessedDataProps {
  data: IProcessDataResponse;
}

export const ProcessedData = ({ data }: IProcessedDataProps) => {
  const [selectedDataset, setSelectedDataset] = useState('standard');
  const [rows, setRows] = useState<GridRowData[]>([]);

  const [cols, setCols] = useState<GridColDef[]>([]);
  const handleToggle = (event: MouseEvent, newDataset: string) => {
    setSelectedDataset(newDataset);
  };

  useEffect(() => {
    setRows(generateRows(data, selectedDataset));
    setCols(generateCols(data, selectedDataset));
  }, [data, selectedDataset]);

  return (
    <Grid container spacing={2}>
      {data.orderedResult.length || data.uniqueOrderedResult.length ? (
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={selectedDataset}
            onChange={handleToggle}
            exclusive
          >
            <ToggleButton
              value="standard"
              aria-label="standard"
              role="toggle"
              disabled={!data.orderedResult.length}
            >
              Standard
            </ToggleButton>
            <ToggleButton
              value="unique"
              aria-label="unique"
              role="toggle"
              disabled={!data.uniqueOrderedResult.length}
            >
              Unique
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        {rows.length && cols.length ? (
          <DataGrid
            rows={rows}
            columns={cols}
            pageSize={10}
            autoHeight={true}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

const generateRows = (data: IProcessDataResponse, selectedDataset: string) => {
  const dataSubset =
    selectedDataset === 'standard'
      ? data.orderedResult
      : data.uniqueOrderedResult;
  return dataSubset.map((item, i) => ({
    ...item,
    id: i,
  }));
};

const generateCols = (data: IProcessDataResponse, selectedDataset: string) => {
  let dataSubset =
    selectedDataset === 'standard'
      ? data.orderedResult
      : data.uniqueOrderedResult;
  return Object.keys(dataSubset[0] || {}).map((key) => ({
    field: key,
    headerName: key,
    width: 200,
  }));
};
