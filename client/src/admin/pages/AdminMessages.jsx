import { useEffect, useState } from "react";

import {
  getMessages,
  updateMessage,
  deleteMessage,
  sendMessageReply,
} from "../../services/contactService";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [replyingId, setReplyingId] = useState(null);
  const [sendingId, setSendingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await getMessages();
      setMessages(response.messages || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markRead = async (id) => {
    try {
      await updateMessage(id, { isRead: true });
      await loadMessages();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update message.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteMessage(id);
      await loadMessages();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete message.");
    }
  };

  const handleReply = async (id) => {
    const body = replyDrafts[id]?.trim();
    if (!body) return;
    setSendingId(id);
    setError("");
    try {
      await sendMessageReply(id, body);
      setReplyDrafts((current) => ({ ...current, [id]: "" }));
      setReplyingId(null);
      await loadMessages();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reply.");
    } finally {
      setSendingId(null);
    }
  };

  const getStatus = (item) => {
    if (item.replies?.length) return "replied";
    return item.isRead ? "read" : "unread";
  };

  const statusFilters = [
    { value: "all", label: "All", count: messages.length },
    { value: "unread", label: "Unread", count: messages.filter((item) => getStatus(item) === "unread").length },
    { value: "read", label: "Read", count: messages.filter((item) => getStatus(item) === "read").length },
    { value: "replied", label: "Replied", count: messages.filter((item) => getStatus(item) === "replied").length },
  ];
  const filteredMessages = statusFilter === "all"
    ? messages
    : messages.filter((item) => getStatus(item) === statusFilter);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Review incoming contact form submissions.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {!loading && messages.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter messages by status">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={statusFilter === filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${statusFilter === filter.value
                  ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                }`}
              >
                {filter.label} <span className="ml-1 opacity-70">{filter.count}</span>
              </button>
            ))}
          </div>
        )}
        {loading ? (
          <p className="text-slate-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-500">No messages yet.</p>
        ) : filteredMessages.length === 0 ? (
          <p className="text-slate-500">No {statusFilter} messages.</p>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((item) => (
              <div key={item._id} className={`rounded-xl border p-4 ${item.isRead ? "border-slate-200 dark:border-slate-800" : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"}`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.email}</p>
                    <p className="mt-1 text-sm font-medium">{item.subject}</p>
                  </div>
                  <div className="flex gap-2">
                    {!item.isRead && (
                      <button type="button" onClick={() => markRead(item._id)} className="rounded-lg border border-blue-300 px-2 py-1 text-xs text-blue-700">Mark read</button>
                    )}
                    <button type="button" onClick={() => handleDelete(item._id)} className="rounded-lg border border-red-300 px-2 py-1 text-xs text-red-600">Delete</button>
                  </div>
                </div>

                <p className="mt-3 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{item.message}</p>
                {item.replies?.length > 0 && <div className="mt-4 space-y-2 border-l-2 border-emerald-600 pl-3">{item.replies.map((reply) => <div key={reply._id}><p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">Sent reply · {new Date(reply.sentAt).toLocaleString()}</p><p className="mt-1 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{reply.body}</p></div>)}</div>}
                <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                  {replyingId === item._id ? <div className="space-y-2"><label className="sr-only" htmlFor={`reply-${item._id}`}>Reply to {item.name}</label><textarea id={`reply-${item._id}`} rows="4" value={replyDrafts[item._id] || ""} onChange={(event) => setReplyDrafts((current) => ({ ...current, [item._id]: event.target.value }))} placeholder="Write your reply..." className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" /><div className="flex gap-2"><button type="button" onClick={() => handleReply(item._id)} disabled={sendingId === item._id || !replyDrafts[item._id]?.trim()} className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">{sendingId === item._id ? "Sending..." : "Send reply"}</button><button type="button" onClick={() => setReplyingId(null)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700">Cancel</button></div></div> : <button type="button" onClick={() => setReplyingId(item._id)} className="rounded-lg border border-emerald-700 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30">Reply by email</button>}
                </div>
                <p className="mt-3 text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
