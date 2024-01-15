import { useState } from "react";
import { TextField,Grid,Button, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function CompanyStockInterface() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [id,setId]=useState();
  const [name,setName]=useState();
  const [date,setDate]=useState();
  const [openRate,setOpenRate]=useState();
  const [closeRate,setCloseRate]=useState();
  const [companyLogo,setCompanyLogo]=useState({});

  const handleSubmit=()=>{
    const body={id:id,name:name,date:date,openrate:openRate,closerate:closeRate,companylogo:companyLogo};
    dispatch({type:'ADD_STOCK',payload:[id,body]});
    
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

  return (
    <div style={{display:'flex',padding:20,justifyContent:'center',alignItems:'center',width:'auto',height:'100%'}}>
      <div style={{display:'flex',padding:20,justifyContent:'center',alignItems:'center',width:'50%'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField onChange={(e)=>setId(e.target.value)} fullWidth label="Stock Id" />
          </Grid>

          <Grid item xs={12}>
            <TextField onChange={(e)=>setName(e.target.value)} fullWidth label="Company Name" />
          </Grid>

          <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Today's Date"
                    format="DD-MM-YYYY"
                    onChange={(e) => handleDate(e)}
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
            <TextField onChange={(e)=>setOpenRate(e.target.value)} fullWidth label="Opening Value" />
          </Grid>
          <Grid item xs={6}>
            <TextField onChange={(e)=>setCloseRate(e.target.value)} fullWidth label="Closing Value" />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth>Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={()=>navigate('/displayall')} fullWidth>Display</Button>
          </Grid>

        </Grid>
      </div>

    </div>
  )
}
