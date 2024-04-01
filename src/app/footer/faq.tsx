import { FC } from "react";
import Link from "next/link";

const Faqs: FC = () => {
  return (
    <div className="modal-content">
      <style jsx>{`
        .modal-content {
          border: 2px solid rgb(3 247 25);
          max-height: 80vh; /* Set maximum height for the modal content */
          overflow-y: auto; /* Enable vertical scroll if content exceeds max height */
          padding: 20px; /* Add padding */
          margin: 1rem 10rem; /* Add margin to create space from all sides */
          background-color: black; /* Background color */
          border-radius: 10px; /* Rounded corners */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Box shadow for depth */
        }
      `}</style>
      <div>
        {" "}
        <div className="font-bold"> I WANT IT . . . YOU GOT IT ? / FAQ’s </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          Do I have to be a member to browse listings ?
        </div>
        <div>
          You do NOT have to be a member to browse listings. When you respond to
          a listing for the first time, you’ll be directed to our Free, Quick &
          Easy{" "}
          <Link className="text-dark-green" href="/sign-up">
            Sign-Up Page.{" "}
          </Link>
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          Are all listings free?
        </div>
        <div>
          Yes – You can post your wanted items for free. You must visit your
          profile once a month to keep your listings active.
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          Are there any fees?{" "}
        </div>
        <div>
          IWI takes a flat transaction fee of 12% of the actual item cost.
          Shipping is additional which is negotiated between the seeker and the
          owner of the goods and is added to the final sales price plus PayPal
          fee. When applicable, tax will also be invoiced by PayPal.{" "}
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          How can I edit my listing?
        </div>
        <div>
          Edits for listings are self-service. You can edit from your account
          homepage.
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          How soon does my listing expire?
        </div>
        <div>
          You must visit your profile once a month to keep your listings active.{" "}
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          How can I de-activate or delete my listing?
        </div>
        <div>
          De-activate or delete your posting from your account homepage. Please
          note, you must visit your profile at least once a month to keep your
          listings active.
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          How can I post anonymously and still receive responses?
        </div>
        <div>
          All listings on IWI are anonymous and 2-way communication between
          seeker and owner of items is facilitated exclusively via the IWI
          Platform. Providing private /personal emails / addresses / phone
          numbers is prohibited.
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          Can I add a picture to my listing?
        </div>
        <div>
          You are offered the option to "Add Image" during the listing process.
          Photos can be uploaded by responders to your listings.
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          What kind of postings are prohibited?
        </div>
        <div>
          Please consult the IWI Terms of Use. For your reference, there is also
          a non-comprehensive list of Prohibited Items{" "}
        </div>
        <div className="bg-dark-green text-black font-bold w-fit my-1">
          Prohibited Use, Content, Items & Materials
        </div>
        <div>
          Users must comply with all applicable laws, the IWI Terms Of Use, and
          all posted site rules.
        </div>
        Here is a partial list of goods, services, and content prohibited on
        IWI:
        <li>
          {" "}
          weapons; firearms/guns and components; BB/pellet, stun, and spear
          guns; etc
        </li>
        <li>
          ammunition, clips, cartridges, reloading materials, gunpowder,
          fireworks, explosives
        </li>
        <li>
          offers, solicitation, or facilitation of illegal prostitution and/or
          sex trafficking
        </li>
        <li> exploitation or endangerment of minors; child pornography</li>
        <li>
          {" "}
          recalled items; hazardous materials; body parts/fluids; unsanitized
          bedding/clothing
        </li>
        <li>
          {" "}
          prescription drugs, medical devices; controlled substances and related
          items
        </li>
        <li>
          {" "}
          alcohol or tobacco; unpackaged or adulterated food or cosmetics
        </li>
        <li> pet sales, animal parts, stud service</li>
        <li>
          {" "}
          endangered, imperiled and/or protected species and any parts thereof,
          e.g. ivory
        </li>
        <li>
          {" "}
          false, misleading, deceptive, or fraudulent content; bait and switch;
          keyword spam
        </li>
        <li>
          {" "}
          offensive, obscene, defamatory, threatening, or malicious postings or
          email
        </li>
        <li>
          {" "}
          anyone’s personal, identifying, confidential or proprietary
          information
        </li>
        <li>
          {" "}
          food stamps, WIC vouchers, SNAP or WIC goods, governmental assistance
        </li>
        <li>
          {" "}
          stolen property, property with serial number removed/altered, burglary
          tools, etc
        </li>
        <li>
          {" "}
          ID cards, licenses, police insignia, government documents, birth
          certificates, etc
        </li>
        <li>
          {" "}
          US military items not demilitarized in accord with Defense Department
          policy
        </li>
        <li>
          {" "}
          counterfeit, replica, or pirated items; tickets or gift cards that
          restrict transfer
        </li>
        <li>
          {" "}
          lottery or raffle tickets, sweepstakes entries, slot machines,
          gambling items
        </li>
        <li> spam; miscategorized, overposted content</li>
        <li>
          {" "}
          postings or email the primary purpose of which is to drive traffic to
          a website
        </li>
        <li>
          {" "}
          postings or email offering, promoting, or linking to unsolicited
          products or services
        </li>
        <li>
          {" "}
          affiliate marketing; network, or multi-level marketing; pyramid
          schemes
        </li>
        <li>
          {" "}
          any good, service, or content that violates the law or legal rights of
          others
        </li>
        <div>
          Please don't use IWI for these purposes, and flag anyone else you see
          doing so.
        </div>
        <div>
          Thanks for helping keep <b>I Want It . . .You Got It? </b>safe and
          useful for everyone.
        </div>
      </div>
    </div>
  );
};

export default Faqs;
