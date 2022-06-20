import CookieConsent from "react-cookie-consent";

const CookieConsentRow = () => {
    return (
        <CookieConsent
            location="bottom"
            buttonText="I Agree"
            cookieName="privacyConcentCookie"
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
        >
            peaq uses cookies on this site to enhance your user experience , improve your site journey , and assist in our marketing efforts.
        </CookieConsent>
        // <div>this is concent bar</div>
    );
}

export default CookieConsentRow;