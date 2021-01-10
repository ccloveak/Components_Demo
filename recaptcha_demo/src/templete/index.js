import { Button } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";

const Captcah =()=>{

    const  resetCaptcha =()=>{
        captcha.reset()
      }
    let captcha

    return(
        <>
            <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                date-testid="google-recaptcha"
                ref={el => { captcha = el; }}
            />              
            <Button
                type="primary"
                onClick={resetCaptcha}
            >
                    reset
            </Button>
        </> 
    )
}


export default Captcah;