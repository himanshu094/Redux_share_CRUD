import MaterialTable from "@material-table/core";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {Button,Grid, TextField,Avatar} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

export default function DisplayAll() {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [id,setId]=useState();
  const [name,setName]=useState();
  const [date,setDate]=useState();
  const [openRate,setOpenRate]=useState();
  const [closeRate,setCloseRate]=useState();
  const [companyLogo,setCompanyLogo]=useState();
  const [refresh,setRefresh]=useState(false);
  const [open,setOpen]=useState(false);

  const stockList=useSelector((state)=>state.companyStockData);
  const list=Object.values(stockList);

  const handleEdit=(rowData)=>{
    setId(rowData.id);
    setName(rowData.name);
    setDate(rowData.date);
    setOpenRate(rowData.openrate);
    setCloseRate(rowData.closerate);
    setCompanyLogo(rowData.companylogo);
   
    setOpen(true);
  }

  
  const handleDelete=(rowData)=>{
    dispatch({type:"DEL_STOCK",payload:[rowData.id]});
    setRefresh(!refresh)
  }

  const handleEditData=()=>{
    const body={id:id,name:name,date:date,openrate:openRate,closerate:closeRate,companylogo:companyLogo};
    dispatch({type:'EDIT_STOCK',payload:[id,body]});
    setRefresh(!refresh)
  }

  const handleClose=()=>{
    setOpen(false);
  }

  const handlePicture=(event)=>{
    setCompanyLogo(URL.createObjectURL(event.target.files[0]))
  }

  const handleDate=(event)=>{
    const m=String(Number(event.$M)+1);
    const d=String(event.$D);
    const y=String(event.$y);
    setDate(y+"-"+m+"-"+d);
  }


  const showDialog=()=>{
    return(<div>
      <Dialog open={open} >
        <DialogTitle>
          Edit CCompany Stock
        </DialogTitle>

        <DialogContent>
            <div style={{display:'flex',padding:20,justifyContent:'center',alignItems:'center',width:'auto',height:'100%'}}>
              <div style={{display:'flex',padding:20,justifyContent:'center',alignItems:'center'}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField disabled value={id} onChange={(e)=>setId(e.target.value)} fullWidth label="Stock Id" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField value={name} onChange={(e)=>setName(e.target.value)} fullWidth label="Company Name" />
                  </Grid>

                  <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                          <DatePicker
                            label="Today's Date"
                            format="DD-MM-YYYY"
                            onChange={handleDate}
                            defaultValue={dayjs(date)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                  </Grid>

                  <Grid item xs={6} style={{justifyContent:'center',display:'flex'}}>
                      <Avatar
                        variant="rounded"
                        alt="Remy Sharp"
                        src={companyLogo}
                        sx={{ width: 70, height: 70 }}
                      />
                  </Grid>

                  <Grid item xs={6}>
                      <Button fullWidth component="label" variant="contained" >
                          <input 
                          hidden onChange={handlePicture} 
                          accept="image/*" multiple type="file"/>
                          Upload Company Logo
                      </Button>
                  </Grid>
                  <Grid item xs={6}></Grid>

                  <Grid item xs={6}>
                    <TextField value={openRate} onChange={(e)=>setOpenRate(e.target.value)} fullWidth label="Opening Value" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField value={closeRate} onChange={(e)=>setCloseRate(e.target.value)} fullWidth label="Closing Value" />
                  </Grid>

                  <Grid item xs={6}>
                    <Button onClick={handleEditData} fullWidth>Submit</Button>
                  </Grid>
                 
                </Grid>
              </div>

            </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>)
  }

  const showAllStock=()=>{
    return(<MaterialTable
      title="Display All Stock"
      columns={[
        { title: 'Id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Date', field: 'date' },
        {title: 'Opening Value',field: 'openrate'},
        {title: 'Closing Value',field: 'closerate'},
        { title: 'Logo' , render:rowData=><div><img src={`${rowData.companylogo}`} style={{width:50,height:50,borderRadius:10}} /></div>}
      ]}
      data={list}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Stock',
          onClick: (event, rowData) => handleEdit(rowData)
        },
        {
          icon: 'delete',
          tooltip: 'Delete Stock',
          onClick: (event, rowData) => handleDelete(rowData)
        },
        {
          icon: 'add',
          tooltip: 'Add Employee',
          isFreeAction: true,
          onClick: (event) => navigate('/')
        }
      ]}
    />)
  }
  
  return (
    <div style={{display:'flex',padding:20,justifyContent:'center',alignItems:'center',width:'auto',height:'100%'}}>
      <div style={{display:'flex',padding:20,justifyContent:'center',alignItems:'center',width:'80%'}}>
        {showAllStock()}
        {showDialog()}
      </div>
    </div>
  )
}
