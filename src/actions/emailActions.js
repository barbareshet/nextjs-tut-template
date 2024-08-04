"use server"

import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import {invoiceTemplate} from "@/lib/emailTemplate/invoice";

function compileInvoiceTemplate(name, amount){
    const template = handlebars.compile(invoiceTemplate);
    return template({name, amount});
}

export const sendEmail = async ({ subject, message, email, data }) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: true,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    const template = compileInvoiceTemplate(data.name, data.amount)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: template
    };
    try {
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info){
                if (error){
                    console.error(error);
                    reject(error);
                } else {
                    console.log("Email Sent", info.response)
                    resolve(info.response)
                }
            })
        });
        return {
            message: "Invoice sent successfully"
        }
    } catch (err){
        return {
            error: "Could not send Invoice"
        }
    }



}