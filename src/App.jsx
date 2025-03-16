import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGenratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //handleSubmit function is intended to handle the process of generating an email reply.
  //async function signifies that the function will operate asynchronously.
  //it is used to take some time to complete such as 
  //fetching data from an API (a server) and reading or writing files.
  const handleSubmit = async() => {
     setLoading(true);
     setError('');
    //  Similar to try catch in Java.
    // While try statement is executed, catch stattement will executed if an error is found
    //  in the try
     try{
      // Set end point with axios.post and axios is able to make HTTP requsts to a server
      //from a web application local ver. http://localhost:8080
      const response = await axios.post("https://ai-email-writer-backend-i90i.onrender.com/api/email/generate", {
        // pass emailContent, tone as a part of the request body
        emailContent,
        tone
      } );
      //The statement below means response.data is 'string', set response.data as generatedReply;
      //otherwise convert response.data to string.
      setGenratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
     } catch (error){
       setError('Failed to generate email reply.');
       console.error(error);
      //  With finally, set loading variable false which is the initial situation.
     } finally {
      setLoading(false);
     }
  }
  
  return (
    //Container is component and maxWidth is props of Container from mui/material
    //sx is the sys prop that enables defining system overrides as well as additional CSS style
    //py is "padding vertical(y axis)" with number 4.
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

    {/* mx refers to margin horizontally */}
    {/* <Box> is similar to <div> but with MUI stylying */}
      <Box sx={{mx: 3}}>
        <TextField
          fullWidth
          multiline
          rows={6}
          // This prop gives the TextField an outlined appearance.
          variant='outlined'
          label={'Original Email Content'}
          // set the values of TextField to emailContent.
          // If emailContent is null or undefined, return empty to TextField.
          value={emailContent || ''}
          // If sth happens in TextField update the state of emailContent state
          // as the value triggers setEmailContent to run.
          onChange={(e)=>setEmailContent(e.target.value)}
          // margin bottm 2
          sx={{mb: 2}}/>

          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              // value is tone and initial value is empty
              // if it is none or undefined.
              value={tone || ''}
              label="Tone (Optional)"
              // if sth happens in the select, update the tone state.
              onChange={(e)=>setTone(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">professional</MenuItem>
                <MenuItem value="casual">casual</MenuItem>
                <MenuItem value="friendly">friendly</MenuItem>

            </Select>
          </FormControl>
          <Button
            variant='contained'
            onClick={handleSubmit}
            // || refers to or which means if emailContent or loading are true, or
            //both are true disabled runs.
            disabled={!emailContent || loading}
            fullWidth>
            {/* any other operation that takes time to complete.
             If loading is true CircularProgress component is returned
             If not, Generate Reply is displayed */}
            {loading ? <CircularProgress size={24}/> :"Generate Reply"}
          </Button>

      </Box>

      {error && (
        <Typography color='error' sx={{mb:2}}>
           {error}
        </Typography>
      )}

{/* If genereatedReply value is truthy, then return the following render. */}
{/* So sth happens in the generatedReply */}
      {generatedReply && (
        <Box sx={{mt:3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            // generatedReply is null or undefined, then '' is returned.
            value={generatedReply || ''}
            //To prevent users from editing text box.
            inputProps={{readOnly: true}}/>
        <Button
          variant='outlined'
          sx={{mt:2}}
          //When the button is clicked, generatedReply is copied to the user's clipboard
          onClick={()=> navigator.clipboard.writeText(generatedReply)}>
            Copy to clipboard
        </Button>

        </Box>
      )}

    </Container>
  )
}

export default App
