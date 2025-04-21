"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Modal, TabPanel, Tabs } from "@/components/common";
import { useModal, TabItem } from "@/lib/contexts";
import { useState } from "react";
import Link from "next/link";
import { CustomImage } from "@/components/ui/CustomImage";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Modal state and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // For context-based modals
  const { openModal: openContextModal, closeModal: closeContextModal } = useModal();

  const handleOpenContextModal = () => {
    openContextModal(
      "example-modal",
      <Modal
        isOpen={true}
        onClose={() => closeContextModal("example-modal")}
        title="Context Modal 예제"
      >
        <p className="text-neutral-700">이 모달은 ModalContext로 관리됩니다!</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => closeContextModal("example-modal")}>닫기</Button>
        </div>
      </Modal>
    );
  };

  // Tab example
  const tabItems: TabItem[] = [
    {
      id: "tab1",
      label: "첫번째 탭",
      content: (
        <TabPanel>
          <div className="rounded bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">첫번째 탭 내용</h3>
            <p className="text-neutral-600">이 탭은 TabContext API를 사용하여 구성되었습니다.</p>
          </div>
        </TabPanel>
      ),
    },
    {
      id: "tab2",
      label: "두번째 탭",
      content: (
        <TabPanel>
          <div className="rounded bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">두번째 탭 내용</h3>
            <p className="text-neutral-600">
              탭 컨텍스트로 쉽게 컴포넌트 간 상태를 공유할 수 있습니다.
            </p>
          </div>
        </TabPanel>
      ),
    },
    {
      id: "tab3",
      label: "세번째 탭",
      content: (
        <TabPanel>
          <div className="rounded bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">세번째 탭 내용</h3>
            <p className="text-neutral-600">탭을 쉽게 추가하고 관리할 수 있습니다.</p>
          </div>
        </TabPanel>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <CustomImage
          src="/images/hero.jpg"
          alt="Samsung Lions Stadium"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">Welcome to Samsung Lions</h1>
            <p className="mb-8 text-xl">Experience the excitement of KBO baseball</p>
            <Link
              href="/tickets"
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
            >
              Get Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Latest News</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="overflow-hidden rounded-lg bg-white shadow-md">
                <CustomImage
                  src={`/images/news-${item}.jpg`}
                  alt={`News ${item}`}
                  width={400}
                  height={250}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">Latest Team Updates</h3>
                  <p className="mb-4 text-gray-600">
                    Stay updated with the latest news and developments from the Samsung Lions team.
                  </p>
                  <Link
                    href={`/news/${item}`}
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Games */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Upcoming Games</h2>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[1, 2].map((game) => (
                <div
                  key={game}
                  className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CustomImage
                        src="/images/logo.png"
                        alt="Samsung Lions Logo"
                        width={40}
                        height={40}
                      />
                      <span className="font-semibold">Samsung Lions</span>
                    </div>
                    <span className="text-gray-500">VS</span>
                    <div className="flex items-center space-x-4">
                      <CustomImage
                        src="/images/opponent-logo.png"
                        alt="Opponent Logo"
                        width={40}
                        height={40}
                      />
                      <span className="font-semibold">Opponent Team</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">May 15, 2024</p>
                    <p className="text-gray-600">7:00 PM KST</p>
                    <p className="text-gray-600">Daegu Samsung Lions Park</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
