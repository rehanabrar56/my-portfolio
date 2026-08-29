package com.rehan.portfolio.service;

import com.rehan.portfolio.dto.ContactRequest;
import com.rehan.portfolio.dto.ContactResponse;
import com.rehan.portfolio.entity.Contact;
import com.rehan.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public ContactResponse saveContact(ContactRequest request) {
        Contact contact = new Contact(
                request.getName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getMessage().trim()
        );

        Contact saved = contactRepository.save(contact);

        return new ContactResponse(
                true,
                "Your message has been sent successfully.",
                saved.getId()
        );
    }
}
