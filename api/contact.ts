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

        const { error } = await resend.emails.send({
            from: 'Contact Site <onboarding@resend.dev>',
            to: ['modestehedji@gmail.com'],
            replyTo: email,
            subject: `[Contact] ${subject || 'Nouveau message'} — ${name}`,
            html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #f4efe4; border-radius: 8px;">
          <h2 style="color: #b8922a; font-size: 1.4rem; margin-bottom: 0.5rem;">Nouveau message de contact</h2>
          <hr style="border: none; border-top: 1px solid #ede7d9; margin-bottom: 1.5rem;" />
          
          <p style="margin: 0.5rem 0;"><strong>Nom :</strong> ${name}</p>
          <p style="margin: 0.5rem 0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 0.5rem 0;"><strong>Type de demande :</strong> ${subject || 'Non précisé'}</p>
          
          <h3 style="color: #1a1710; margin-top: 1.5rem; font-size: 1rem;">Message :</h3>
          <div style="background: white; padding: 1rem 1.2rem; border-left: 3px solid #b8922a; border-radius: 4px; font-size: 0.95rem; line-height: 1.7; color: #333;">
            ${message.replace(/\n/g, '<br />')}
          </div>
          
          <p style="margin-top: 2rem; font-size: 0.8rem; color: #6b6560;">
            Message reçu via le formulaire de contact du site chams-modeste.vercel.app
          </p>
        </div>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ error: "Erreur lors de l'envoi. Réessayez plus tard." });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Contact handler error:', err);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
}
