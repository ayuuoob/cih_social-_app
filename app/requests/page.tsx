"use client"

import Link from "next/link"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function RequestsPage() {
  const { language, requests } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const typeLabels: Record<string, string> = {
    death: t("services.death"),
    funeral: t("services.funeral"),
    medical: t("services.medical"),
    microcredit: t("services.microcredit"),
    salary: t("services.salary"),
  }

  return (
    <div className="p-4 md:p-8 max-w-md lg:max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold cih-text-blue mb-6">{t("requests.title")}</h1>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-xl font-medium text-gray-600 mb-4">
            {language === "fr" ? "Aucune demande" : "لا توجد طلبات"}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {language === "fr" ? "Vous n'avez pas encore soumis de demandes" : "لم تقدم أي طلبات بعد"}
          </p>
          <Link href="/" className="inline-block cih-btn-primary">
            {language === "fr" ? "Consulter les services" : "عرض الخدمات"}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => (
            <Link
              key={request.id}
              href={`/request-details/${request.id}`}
              className="block bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md hover:border-blue-500 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{typeLabels[request.type] || request.type}</h3>
                  <p className="text-xs text-gray-500 mt-1">{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap ${
                    request.status === "pending"
                      ? "bg-yellow-500"
                      : request.status === "accepted"
                        ? "bg-green-500"
                        : request.status === "paid"
                          ? "bg-blue-500"
                          : "bg-red-500"
                  }`}
                >
                  {request.status === "pending"
                    ? t("requests.statusPending")
                    : request.status === "accepted"
                      ? t("requests.statusAccepted")
                      : request.status === "paid"
                        ? t("requests.statusPaid")
                        : t("requests.statusRejected")}
                </span>
              </div>
              <p className="text-lg font-bold cih-text-blue">{request.amount} MAD</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
