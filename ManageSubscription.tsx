// src/pages/ManageSubscription.tsx

import { usePaymentContext } from "@/contexts/PaymentContext";
import { useApp } from "@/contexts/AppContext";

export default function ManageSubscription() {
  const { user } = useApp();
  const {
    status,
    tier,
    hasAccess,
    loading,
    cancelAtPeriodEnd,
    trialEndsAt,
    cancelMembership,
    refreshSubscription,
  } = usePaymentContext();

  const handleCancel = async () => {
    await cancelMembership();
    await refreshSubscription();
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
    <div className="manage-subscription" style={{ padding: "20px" }}>
      <h2>Manage Subscription</h2>

      {loading && <p>Loading subscription...</p>}

      {!loading && (
        <>
          <div className="subscription-status" style={{ marginBottom: "20px" }}>
            <p>
              <strong>Status:</strong> {status}
            </p>

            <p>
              <strong>Tier:</strong> {tier ?? "None"}
            </p>

            {trialEndsAt && (
              <p>
                <strong>Trial Ends:</strong>{" "}
                {new Date(trialEndsAt).toLocaleDateString()}
              </p>
            )}

            {cancelAtPeriodEnd && (
              <p style={{ color: "orange" }}>
                Your membership will end at the end of the billing period.
              </p>
            )}
          </div>

          {/* Actions */}
          {hasAccess && !cancelAtPeriodEnd && (
            <button
              onClick={handleCancel}
              className="cancel-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Cancel Membership"}
            </button>
          )}

          {!hasAccess && (
            <p style={{ opacity: 0.7 }}>
              You do not have an active subscription.
            </p>
          )}
        </>
      )}
    </div>
  );
}
