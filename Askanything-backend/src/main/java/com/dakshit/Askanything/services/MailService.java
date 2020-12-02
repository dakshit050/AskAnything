package com.dakshit.Askanything.services;

import com.dakshit.Askanything.exceptions.SpringRedditException;
import com.dakshit.Askanything.model.NotificationEmail;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class MailService {
    private final JavaMailSender javaMailSender;
    private  final MailcontentBuilder mailcontentBuilder;
    @Async
    public void sendMail(NotificationEmail notificationEmail){
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("askanything432@gmail.com");
            messageHelper.setTo(notificationEmail.getRecipient());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(mailcontentBuilder.build(notificationEmail.getBody()),true);

        };
        try {
            javaMailSender.send(messagePreparator);
            log.info("Activation email sent!");
        }catch (MailException e){
            throw new SpringRedditException("Exception ocuured when sending mail to user");
        }
    }
}
