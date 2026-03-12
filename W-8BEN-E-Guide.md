# How to Fill Out the U.S. Substitute Form W-8BEN-E on App Store Connect

> **Disclaimer:** This guide is provided for informational purposes only. The author is not an accountant, tax advisor, or legal professional. Before submitting this form, please consult with a qualified accountant or legal professional to verify that the information is correct for your specific situation. The author assumes no liability for any errors, omissions, or consequences arising from the use of this guide.

---

## Why Do I Need to Fill This Out?

Apple requires this form from non-US companies that sell paid apps or in-app purchases on the App Store. Without it, your **Paid Apps Agreement** stays in "Pending User Info" status, which means your in-app purchases won't work — even in sandbox/testing.

The form tells the US tax authorities that your company is based outside the US and provides information about your tax status.

---

## Part I: Identification of Beneficial Owner

| Field | What to Enter |
|-------|---------------|
| **1. Name of organization** | Should already be filled in (Oomphh s.r.o) |
| **2. Country or region** | Should already be filled in (Czechia) |
| **3. Chapter 3 Status (entity type)** | Select **"Corporation"** — an s.r.o. is treated as a corporation for US tax purposes |
| **6. Permanent Residence Address** | Should already be filled in |
| **7. Mailing Address** | Should already be filled in |
| **8. U.S. TIN** | Leave empty — not required for Czech entities |
| **9b. Foreign TIN** | Enter your Czech company **ICO** (company ID) or **DIC** (tax ID) |
| **10. Reference Number(s)** | Leave empty |

---

## Part III: Claim of Tax Treaty Benefits

### Section 14 — Check the following boxes:

- [x] **"The beneficial owner is a resident of Czechia within the meaning of the income tax treaty between United States and that country or region."**
  - *This means: "My company is based in Czechia, and Czechia has a tax treaty with the US."*

- [x] **"The beneficial owner derives the item (or items) of income for which the treaty benefits are claimed... meets the requirements of the treaty provision dealing with limitation on benefits"**
  - *This means: "My company actually qualifies for the tax treaty — it's a real company, not a shell entity."*
  - **"Type of limitation on benefits provisions"** dropdown: Select **"Company that meets the ownership and base erosion test"**
  - *This means: "The company is owned by Czech residents and most of its income isn't being funneled elsewhere to avoid taxes."*

- [ ] **"The beneficial owner is claiming treaty benefits for dividends received from a foreign corporation..."**
  - **Do NOT check this one.** This is about dividends/interest from US corporations and does not apply here.

### Section 15 — Special Rate and Conditions:

| Field | What to Enter |
|-------|---------------|
| **Article** | **12** |
| **Paragraph** | **2** |
| **% rate of withholding** | **10** |
| **Type of income** | Check **"Income from the sale of applications"** |

---

## Part XXX: Certification

- [x] **"Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete."**
  - *This means: "Everything I wrote on this form is true."*

- [x] **"I certify that I have the capacity to sign for the entity identified on line 1 of this form."**
  - *This means: "I am authorized to sign legal documents on behalf of Oomphh s.r.o." (e.g., you are the company director/owner).*

---

## After Submitting

Once the form is submitted and processed, the Paid Apps Agreement status should change from "Pending User Info" to **"Active"**. After that, the in-app purchase products will become available in sandbox and production.
