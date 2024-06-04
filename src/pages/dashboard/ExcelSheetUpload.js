import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import usePost from 'hooks/usePost';
import { Box, Button ,Grid} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { ExcelSheetupload } from 'constants/api';

const ExcelSheetUploadForm = () => {
  const { mutateAsync: ExcelSheetUploadSheets } = usePost();
  const [importExcelFileData, setImportExcelFileData] = useState(null);

  const excelSheetuploadSheet = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      defval: '',
    });
    setImportExcelFileData(file);
    // setImportExcelFileData(jsonData);
  };

  const excelSheetDriverupdate = (event) => {
    event.preventDefault();
    if (!importExcelFileData) {
      return;
    }
    const formData = new FormData();
    formData.append('excelFile', importExcelFileData);
    ExcelSheetUploadSheets({
      url: ExcelSheetupload,
      type: 'details',
      token: true,
      payload:formData,
      file:true
    })
      .then((res) => {
        toast.success(" successfully Submit", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((err) => {
        toast.error("Something Went Wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  Button.propTypes = {
    bgcolor: PropTypes.string,
  };
  return (
    <Box sx={{ mb: 4,marginLeft:"auto" }}>
      
     <Grid >
     <form>        
        <Box  sx={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        width: '202px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '73px',
        marginBottom:'20px'
      }}>
          <input style={{ position: 'absolute',
        opacity: 0,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,}}
            id="fileInput"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => excelSheetuploadSheet(e)}
          />
          Upload ExcelSheet
        </Box>
        <Button 
          onClick={excelSheetDriverupdate}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{maxWidth:"200px",backgroundColor:"success.dark"}}
        >
          Submit Excel Sheet
        </Button>
      </form>
     </Grid>
    </Box>
  );
};

export default ExcelSheetUploadForm;
