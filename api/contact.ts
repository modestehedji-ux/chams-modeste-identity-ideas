import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Champs obligatoires manquants.' });
        }

        const subjectLabel = subject || 'Non precis';

        const { error } = await resend.emails.send({
            from: 'Formulaire Contact <onboarding@resend.dev>',
            to: ['modestehedji@gmail.com'],
            replyTo: email,
            subject: `[Contact Site] ${subjectLabel} - de ${name}`,
            text: `Nouveau message de contact\n\nNom : ${name}\nEmail : ${email}\nType de demande : ${subjectLabel}\n\nMessage :\n${message}\n\n---\nMessage recu via le formulaire de contact du site chams-modeste.vercel.app`,
            html: `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #f4efe4; border-radius: 8px;">
  <h2 style="color: #b8922a; font-size: 1.4rem; margin-bottom: 0.5rem;">Nouveau message de contact</h2>
  <hr style="border: none; border-top: 1px solid #ede7d9; margin-bottom: 1.5rem;" />

  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 0.5rem 0; font-weight: bold; width: 140px; vertical-align: top; color: #1a1710;">Nom :</td>
      <td style="padding: 0.5rem 0; color: #333;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem 0; font-weight: bold; vertical-align: top; color: #1a1710;">Email :</td>
      <td style="padding: 0.5rem 0;"><a href="mailto:${email}" style="color: #b8922a;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 0.5rem 0; font-weight: bold; vertical-align: top; color: #1a1710;">Type de demande :</td>
      <td style="padding: 0.5rem 0; color: #333;">${subjectLabel}</td>
    </tr>
  </table>

  <h3 style="color: #1a1710; margin-top: 1.5rem; font-size: 1rem;">Message :</h3>
  <div style="background: white; padding: 1rem 1.2rem; border-left: 3px solid #b8922a; border-radius: 4px; font-size: 0.95rem; line-height: 1.7; color: #333;">
    ${message.replace(/\n/g, '<br />')}
  </div>

  <p style="margin-top: 2rem; font-size: 0.8rem; color: #6b6560;">
    Message recu via le formulaire de contact du site chams-modeste.vercel.app<br />
    Pour repondre, cliquez sur "Repondre" - votre reponse ira directement a ${email}
  </p>
</div>
`,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ error: "Erreur lors de l'envoi. Reessayez plus tard." });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Contact handler error:', err);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
}
