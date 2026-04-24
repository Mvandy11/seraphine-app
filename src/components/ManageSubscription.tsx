import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { usePayment } from "@/contexts/PaymentContext";
import { supabase } from "@/lib/supabaseClient";

export default function ManageSubscription() {
  const { user } = useAppContext();
  const { status, isSubscribed, subscription, cancel, loading } = usePayment();

  const [localLoading, setLocalLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // NEW — trial UI state
  const [trialEnd, setTrialEnd] = useState<Date | null>(null);
  const [trialActive, setTrialActive] = useState(false);
  const [countdown, setCountdown] = useState("");

  // Fetch trial_end from Supabase
  useEffect(() => {
    async function loadTrial() {
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("trial_end")
        .eq("id", user.id)
        .single();

      if (!profile?.trial_end) return;

      const end = new Date(profile.trial_end);
      const now = new Date();

      setTrialEnd(end);

      if (now < end) {
        setTrialActive(true);

        const diff = end.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

        setCountdown(`${days} days, ${hours} hours remaining`);
      } else {
        setTrialActive(false);
      }
    }

    loadTrial();
  }, [user]);

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
          {trialActive
            ? "Trial Active"
            : status === "active"
            ? "Active"
            : status === "canceling"
            ? "Canceling"
            : "Inactive"}
        </p>

        {trialActive && (
          <>
            <p>
              <strong>Trial:</strong> {countdown}
            </p>
            {trialEnd && (
              <p>
                <strong>Ends:</strong>{" "}
                {trialEnd.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </>
        )}

        {subscription && !trialActive && (
          <p>
            <strong>Plan:</strong> {subscription.plan}
          </p>
        )}
      </div>

      {success && <p className="success-message">{success}</p>}
      {isBusy && <p className="loading">Processing...</p>}

      {!isBusy && (
        <div className="actions">
          {isSubscribed && !trialActive ? (
            <button onClick={handleCancel} className="cancel-btn">
              Cancel Subscription
            </button>
          ) : trialActive ? (
            <p>Your free trial is active.</p>
          ) : (
            <p>No active subscription. Visit the Subscribe page to get started.</p>
          )}
        </div>
      )}
    </div>
  );
}
