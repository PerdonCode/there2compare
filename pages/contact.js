import Head from "next/head";
import { useState } from "react";
import Header from "../src/components/layouts/header";

export default function Contact() {

    const [submitStatus, setSumbitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('bg-green-500');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            firstName: event.target.firstName.value,
            subject: event.target.subject.value,
            email: event.target.email.value,
            message: event.target.message.value,
        }
        console.log(data);
    
        const jsonData = JSON.stringify(data);
    
        const response = await fetch('api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        });
    
        const result = await response.json();
        console.log(result.data);
    

        setSumbitStatus(true);
        setResponseMessage(result.data);

        if(!response.ok) {
            setAlertColor('bg-red-500');
        }
        else {
            setAlertColor('bg-green-500');
        }
    
    
    }

    return (
        <>
        <Head>
            <title>Contact Us</title>
        </Head>
        <section className="bg-slate-700">
           <Header/>
        </section>
        <section>
            <div className="container mx-auto lg:max-w-4xl">
                <h1 className="text-4xl text-center text-slate-700 py-8">Contact Us</h1>
                <form className="contact-form " onSubmit={handleSubmit}>
                    <label className="block w-full mb-4" htmlFor="firstName">First Name:</label>
                    <input className="block border focus:outline-none focus:ring focus-ring-yellow-300 w-full mb-4 p-2" type="text" id="firstName" name="firstName" />

                    <label className="block w-full mb-4" htmlFor="email">Email:</label>
                    <input className="block border focus:outline-none focus:ring  w-full mb-4 p-2"  type="email" id="email" name="email" />
        
                    <label className="w-full mb-4 block " htmlFor="subject"></label>
                     <select classname="w-full mb-4 block mb-4 p-2 " id="subject" name="subject">
                        <option label="Feedback">Select Subject</option>
                        <option label="Affiliate Partnership "></option>
                        <option label="Promoting Brand/Store"></option>
                        <option label="Advertising"> </option>
                        <option label="Bug / Something wrong with the site"> </option>
                        <option label="Got some interesting news? tip us"> </option>
                        <option label="Other"> </option>
                    </select>
 
                    <label className="block w-full mb-4" htmlFor="message">Message</label>
                    <textarea className="block border focus:outline-none focus:ring focus-ring-yellow-300 w-full mb-4 p-2" name="message" id="message"></textarea>

                    <button className="inline-block bg-green-400 mb-4 p-3 test-slate-100 text-xl hover:bg-green-600 active:bg-green-700" type="submit">Submit</button>
                </form>
                {submitStatus ? <SubmissionAlert message={responseMessage} alertColor={alertColor} /> : null}
            </div>
            
        </section>
        </>
    );
}

const SubmissionAlert = ({message, alertColor}) => {
    return (
        <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}>
            {message}
        </div>
    )
}