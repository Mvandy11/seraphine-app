import { useAppContext } from "@/contexts/AppContext";
import { usePaymentContext } from "@/contexts/PaymentContext";

export default function HeroSection() {
  const { user } = useAppContext();
  const { hasAccess } = usePaymentContext();

  return (
    <section className="hero-section">
      <h1>Welcome to the Oracle</h1>

      {user ? (
        <p>Hello, {user.email}</p>
      ) : (
        <p>Please sign in to begin your reading.</p>
      )}

      {hasAccess ? (
        <p className="access">Your subscription is active — enjoy full access.</p>
      ) : (
        <p className="no-access">Upgrade to unlock full readings.</p>
      )}
    </section>
  );
}

