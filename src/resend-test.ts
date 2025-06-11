import { Resend } from 'resend';

const resend = new Resend('re_b9KKZz58_PipJDFusYhM8nDoRAGs95jbS'); // 👈 kendi key'in

async function send() {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'erenari27@gmail.com',
      subject: 'Test from local resend-test.ts',
      html: '<strong>✅ It works!</strong>',
    });

    console.log('✅ Email sent:', result);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

send();
