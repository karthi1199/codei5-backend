const axios = require('axios');
require('dotenv').config();


module.exports = {
    sendWhatsappMessage: async (msg_type = 'text-with-var', templateName, sendTo, variables = [], mediaUrl = '') => {
        try {
            
      
          const enable_whatsapp = 1;
          const api_key = 'cb870dadbe10fd61837aa32bc312fc2526a8fd6ba92a86197e7895a04d38a4c9';
      
          if (enable_whatsapp && api_key && templateName && sendTo) {
            let url = 'https://api.wacto.ai/apis/sendMessageApi?Authorization=' + api_key;

            const requestBody = {
              send_to: sendTo,
              template_name: templateName,
              isVariable: true,
              media_url: mediaUrl,
            };
      
            if (msg_type === 'text-without-var') {
              requestBody.msg_type = 'text';
              requestBody.isVariable = false;
            } else if (msg_type === 'text-with-var' && variables.length > 0) {
              requestBody.msg_type = 'text';
              requestBody.variables = variables;
            } else if (msg_type === 'image-without-var' && mediaUrl) {
              requestBody.msg_type = 'image';
              requestBody.isVariable = false;
            } else if (msg_type === 'image-with-var' && mediaUrl && variables.length > 0) {
              requestBody.msg_type = 'image';
              requestBody.variables = variables;
            } else if (msg_type === 'video-without-var' && mediaUrl) {
              requestBody.msg_type = 'video';
              requestBody.isVariable = false;
            } else if (msg_type === 'video-with-var' && mediaUrl && variables.length > 0) {
              requestBody.msg_type = 'video';
              requestBody.variables = variables;
            } else if (msg_type === 'file-without-var' && mediaUrl) {
              requestBody.msg_type = 'file';
              requestBody.isVariable = false;
            } else if (msg_type === 'file-with-var' && mediaUrl && variables.length > 0) {
              requestBody.msg_type = 'file';
              requestBody.variables = variables;
            } else {
              return { status: false, message: 'Please check WhatsApp setting or WhatsApp disabled' };
            }
      
            const response = await axios.post(url, requestBody, { headers: { 'Content-Type': 'application/json' } });
            
            if (response.data.status === 1) {
              return { status: true, message: 'WhatsApp message has been sent.' };
            } else {
              return { status: false, message: response.data.response };
            }
          } else {
            return { status: false, message: 'Incorrect API keys or Exception occurred.' };
          }
        } catch (error) {
          return { status: false, message: 'Error: ' + error.message + ' Incorrect API keys or Exception occurred.' };
        }
      }
      
    }