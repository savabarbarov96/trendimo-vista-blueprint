
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();
    
    if (!record || !record.email) {
      throw new Error('Invalid request data');
    }

    // Format date if it exists
    let consultationDateText = 'Не е избрана';
    if (record.consultation_date) {
      const date = new Date(record.consultation_date);
      consultationDateText = date.toLocaleDateString('bg-BG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Create email body
    const emailBody = `
      <h1>Благодарим за вашата заявка!</h1>
      <p>Здравейте, ${record.name},</p>
      <p>Получихме вашата заявка за продажба на имот. Екип от наши експерти ще я разгледа и ще се свърже с вас възможно най-скоро.</p>
      
      <h2>Детайли на заявката:</h2>
      <ul>
        <li><strong>Тип имот:</strong> ${record.property_type}</li>
        <li><strong>Адрес:</strong> ${record.address}</li>
        <li><strong>Желана консултация:</strong> ${consultationDateText}</li>
      </ul>
      
      <p>Ако имате въпроси, можете да се свържете с нас на телефон: <strong>+359 2 954 3344</strong> или на имейл: <strong>sales@trendimo.bg</strong></p>
      
      <p>С уважение,<br>Екипът на Trendimo</p>
    `;

    // Send email using a third-party service
    // For demonstration purposes, we'll just log the email
    console.log(`Email would be sent to: ${record.email}`);
    console.log(`Email subject: Trendimo - Получена заявка за продажба на имот`);
    console.log(`Email body: ${emailBody}`);

    // In a real implementation, you would integrate with a service like SendGrid:
    // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{ to: [{ email: record.email }] }],
    //     from: { email: 'noreply@trendimo.bg', name: 'Trendimo' },
    //     subject: 'Trendimo - Получена заявка за продажба на имот',
    //     content: [{ type: 'text/html', value: emailBody }]
    //   })
    // });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
