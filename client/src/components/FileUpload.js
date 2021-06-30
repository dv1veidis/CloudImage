import React, {Fragment, useState} from 'react'
import axios from 'axios';

function FileUpload (){
    const [file, setFile] = useState('');
    const [uploadedFile, setUploadedFile]=useState({});
    const [count, setCount] = useState(0);
    const onChange = e =>{
        setFile(e.target.files[0]);
    }

    function message(){
        alert("Adding succesful press generate to generate results!");
    }
    function retrieve(){
        var a=[];
        for(let i=1; i<6; i++){
            a.push(window.localStorage.getItem(i));
        }
        return a;
    }
 

    const onSubmit =async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        message();
        try{ 
            await axios.post('/upload', formData,{
                headers: {'Content-Type': 'multipart/form-data'}
            });
            
        }catch(err){
            if(err.response.status ===500){
                console.log('There was a problem with the server');
            }
            else{
                console.log(err.response.data.msg);
            }
         }
    }
    const onGenerate =async e=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        try{ 
            const res = await axios.post('/generate', formData,{
                headers: {'Content-Type': 'multipart/form-data'}
            });
            const{fileObject} = res.data;
            setUploadedFile({fileObject});
            console.log(uploadedFile.fileObject);
            if(count<5){
                setCount(count=> count+1);
            }
            else{
                setCount(count=> 1);
            }
            window.localStorage.setItem(count, JSON.stringify(" "+count+". "+uploadedFile.fileObject));
            console.log(count);
        }catch(err){
            if(err.response.status ===500){
                console.log('There was a problem with the server');
            }
            else{
                console.log(err.response.data.msg);
            }
         }
    }
    return(
        <Fragment>
       
            <form onSubmit={onSubmit}>
                <div className="input-group mb-4">
                    <input type="file" className="form-control" id="inputGroupFile01" onChange={onChange}/>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>       
            <form onSubmit={onGenerate}>
                <input type="submit" value="Generate" className="btn btn-primary btn-block mt-4"/>
            </form>  
            {uploadedFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedFile.fileObject}</h3>
                </div>
            </div>: null}
            <div>
                Below is the history of your generates
                _______________________________________________________
            </div>
            <div> <h3 className="text-center">{retrieve()}</h3></div>
        </Fragment> 
    )
}

export default FileUpload