"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"
import { ServiceLayout } from "@/components/service-layout"

export default function RequestDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { language, requests, updateRequest } = useAppStore()
  const t = (key: string) => getTranslation(key, language)
  const id = params.id as string

  const request = requests.find((r) => r.id === id)

  if (!request) {
    return (
      <ServiceLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">{language === "fr" ? "Demande non trouvée" : "لم يتم العثور على الطلب"}</p>
          <Link href="/requests" className="cih-btn-secondary inline-block">
            {language === "fr" ? "Retour aux demandes" : "العودة للطلبات"}
          </Link>
        </div>
      </ServiceLayout>
    )
  }

  const typeLabels: Record<string, string> = {
    death: t("services.death"),
    funeral: t("services.funeral"),
    medical: t("services.medical"),
    microcredit: t("services.microcredit"),
    salary: t("services.salary"),
  }

  const handleAccept = () => {
    updateRequest(id, { status: "accepted" })
  }

  const handlePay = async () => {
    updateRequest(id, { status: "paid" })
  }

  return (
    <ServiceLayout>
      <div className="max-w-md mx-auto">
        <Link href="/requests" className="text-[#0078A8] font-medium mb-4 inline-block hover:underline">
          ← {language === "fr" ? "Retour" : "عودة"}
        </Link>

        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h1 className="text-2xl font-bold text-[#0078A8] mb-4">{typeLabels[request.type]}</h1>

          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{t("requests.amount")}</p>
            <p className="text-3xl font-bold text-[#F58220]">{request.amount} MAD</p>
          </div>

          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{t("requests.status")}</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
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

          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{t("requests.date")}</p>
            <p className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="font-bold text-[#333333] mb-4">{t("requests.timeline")}</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-[#0078A8] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm">{t("requests.submitted")}</p>
                <p className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  request.status !== "pending" ? "bg-[#0078A8]" : "bg-gray-300"
                }`}
              ></div>
              <div>
                <p className="font-medium text-sm">{t("requests.analyzing")}</p>
                <p className="text-xs text-gray-500">{request.status !== "pending" ? "Complété" : "En attente"}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  request.status === "paid" ? "bg-[#0078A8]" : "bg-gray-300"
                }`}
              ></div>
              <div>
                <p className="font-medium text-sm">{t("requests.paid")}</p>
                <p className="text-xs text-gray-500">{request.status === "paid" ? "Complété" : "En attente"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {request.status === "pending" && (
          <button onClick={handleAccept} className="cih-btn-primary w-full">
            {language === "fr" ? "Accepter la demande" : "قبول الطلب"}
          </button>
        )}

        {request.status === "accepted" && (
          <button onClick={handlePay} className="cih-btn-secondary w-full">
            {language === "fr" ? "Verser la somme" : "صرف المبلغ"}
          </button>
        )}
      </div>
    </ServiceLayout>
  )
}
