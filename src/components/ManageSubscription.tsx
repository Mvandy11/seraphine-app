import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { usePayment } from "@/contexts/PaymentContext";

export default function ManageSubscription() {
  const { user } = useAppContext();
  const { status, isSubscribed, subscription, cancel, loading } = usePayment();

  const [localLoading, setLocalLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleCancel = async () => {
    setLocalLoading(true);
    setSuccess("");
    try {
      await cancel();
      setSuccess("Your subscription has been canceled.");
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
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

  const isBusy = loading || localLoading;

  return (
    <div className="manage-subscription">
      <h2>Manage Subscription</h2>

      <div className="subscription-status">
        <p>
          <strong>Status:</strong>{" "}
          {status === "active" ? "Active" : status === "canceling" ? "Canceling" : "Inactive"}
        </p>

        {subscription && (
          <p>
            <strong>Plan:</strong> {subscription.plan}
          </p>
        )}
      </div>

      {success && <p className="success-message">{success}</p>}
      {isBusy && <p className="loading">Processing...</p>}

      {!isBusy && (
        <div className="actions">
          {isSubscribed ? (
            <button onClick={handleCancel} className="cancel-btn">
              Cancel Subscription
            </button>
          ) : (
            <p>No active subscription. Visit the Subscribe page to get started.</p>
          )}
        </div>
      )}
    </div>
  );
}
