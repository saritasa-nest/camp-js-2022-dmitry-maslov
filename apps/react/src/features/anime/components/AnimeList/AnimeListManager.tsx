import {
  AnimeSortField,
  SORT_DIRECTION_READABLE_MAP,
} from '@js-camp/core/enums/anime/sort';
import { ANIME_TYPE_READABLE_MAP } from '@js-camp/core/models/anime-type';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
} from '@mui/material';
import { Field, Form, FormikContextType, FormikProvider } from 'formik';
import { TextField, Select } from 'formik-mui';
import { FC, memo, useState } from 'react';
import { getTypedKeyMap } from '@js-camp/utils/getTypedKeyMap';

import { ListManagerValue } from './form-setting';

const formFieldStyle = {
  mb: 1,
};

const SORT_FIELD_MAP = {
  [AnimeSortField.TitleEng]: 'English title',
  [AnimeSortField.Status]: 'Status',
};

interface AnimeListManagerProps {

  /** Formik. */
  readonly formik: FormikContextType<ListManagerValue>;
}

const AnimeListManagerComponent: FC<AnimeListManagerProps> = ({
  formik,
}: AnimeListManagerProps) => {
  const [showParams, setShowParams] = useState(false);
  const toggleShowParams = () => setShowParams(prev => !prev);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Accordion expanded={showParams}>
          <AccordionSummary
            sx={{ padding: 0 }}
            expandIcon={
              <ExpandMore sx={{ mx: 2 }} onClick={toggleShowParams} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Field
              component={TextField}
              name="filterParams.search"
              fullWidth
              sx={{ ml: 2, marginY: 0 }}
              variant="standard"
              label="Search"
              size="small"
            />
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
            <Field
              component={Select}
              name="filterParams.type"
              label="Type"
              multiple
              sx={{ mb: 1 }}
            >
              {getTypedKeyMap(ANIME_TYPE_READABLE_MAP).map((key, idx) => (
                <MenuItem key={idx} value={key}>
                  {ANIME_TYPE_READABLE_MAP[key]}
                </MenuItem>
              ))}
            </Field>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Field
                fullWidth
                label="Sort by"
                component={Select}
                name="sortParams.sortBy"
                sx={formFieldStyle}
              >
                {getTypedKeyMap(SORT_FIELD_MAP).map((key, idx) => (
                  <MenuItem key={idx} value={key}>
                    {SORT_FIELD_MAP[key]}
                  </MenuItem>
                ))}
              </Field>
              <Field
                label="Direction"
                component={Select}
                name="sortParams.direction"
                sx={formFieldStyle}
              >
                {getTypedKeyMap(SORT_DIRECTION_READABLE_MAP).map((key, idx) => (
                  <MenuItem key={idx} value={key}>
                    {SORT_DIRECTION_READABLE_MAP[key]}
                  </MenuItem>
                ))}
              </Field>
            </Box>
            <Button type="submit">Accept</Button>
          </AccordionDetails>
        </Accordion>
      </Form>
    </FormikProvider>
  );
};

export const AnimeListManager = memo(AnimeListManagerComponent);
