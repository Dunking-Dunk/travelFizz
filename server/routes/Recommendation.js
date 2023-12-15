import express from 'express'
import {spawn} from 'child_process' 

const router = express.Router()
import {exec} from 'child_process'


router.get('/travel', async(req,res, next) => {
    exec('reconuserchoice.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error}`);
          return res.status(500).send('Internal Server Error');
        }
        console.log(`Python script output: ${stdout}`);
        res.send('Python script executed successfully');
      });
})


export default router