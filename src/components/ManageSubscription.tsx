import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { usePaymentContext } from "@/contexts/PaymentContext";

export default function ManageSubscription() {
  const { user } = useAppContext();
  const {
    hasAccess,
    subscriptionTier,
    setSubscriptionTier,
    setHasAccess,
  } = usePaymentContext();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleCancel = async () => {
    setLoading(true);
    setSuccess("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setHasAccess(false);
      setSubscriptionTier(null);
      setSuccess("Your subscription has been canceled.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async () => {
    setLoading(true);
    setSuccess("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setHasAccess(true);
      setSubscriptionTier("premium");
      setSuccess("Your subscription is active again.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="manage-subscription">
        <h2>Manage Subscription</h2>
        <p>Please sign in to view your subscription.</p>
      </div>
    );
  }

  return (
    <div className="manage-subscription">
      <h2>Manage Subscription</h2>

      <div className="subscription-status">
        <p>
          <strong>Status:</strong>{" "}
          {hasAccess ? "Active" : "Inactive"}
        </p>

        <p>
          <strong>Tier:</strong>{" "}
          {subscriptionTier ? subscriptionTier : "None"}
        </p>
      </div>

      {success && <p className="success-message">{success}</p>}

      {loading && <p className="loading">Processing...</p>}

      {!loading && (
        <div className="actions">
          {hasAccess ? (
            <button onClick={handleCancel} className="cancel-btn">
              Cancel Subscription
            </button>
          ) : (
            <button onClick={handleReactivate} className="reactivate-btn">
              Reactivate Subscription
            </button>
          )}
        </div>
      )}
    </div>
  );
}



