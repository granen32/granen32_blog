"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Modal, TabPanel, Tabs } from "@/components/common";
import { useModal, TabItem } from "@/lib/contexts";
import { useState } from "react";

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
    <main className="flex min-h-screen flex-col items-center bg-background p-8">
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="space-y-4 text-center">
          <h1 className="text-primary text-4xl font-bold">granen32</h1>
          <p className="text-neutral-500">Next.js와 TypeScript를 사용한 granen32 프로젝트</p>
        </header>

        <section className="space-y-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="border-b pb-3 text-2xl font-semibold text-neutral-800">커스텀 컴포넌트</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-neutral-700">모달 컴포넌트</h3>
            <div className="flex flex-wrap gap-4">
              <Button onClick={openModal}>기본 모달 열기</Button>
              <Button variant="secondary" onClick={handleOpenContextModal}>
                컨텍스트 모달 열기
              </Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="기본 모달 예제">
              <p className="text-neutral-700">기본 모달 컴포넌트 예제입니다!</p>
              <div className="mt-4 flex justify-end">
                <Button onClick={closeModal}>닫기</Button>
              </div>
            </Modal>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-neutral-700">탭 컴포넌트</h3>
            <Tabs tabs={tabItems} />
          </div>
        </section>

        <section className="space-y-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="border-b pb-3 text-2xl font-semibold text-neutral-800">
            UI 컴포넌트 모음
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-neutral-700">버튼 컴포넌트</h3>
            <div className="flex flex-wrap gap-4">
              <Button>기본 버튼</Button>
              <Button variant="secondary">보조 버튼</Button>
              <Button variant="outline">아웃라인 버튼</Button>
              <Button variant="ghost">고스트 버튼</Button>
              <Button variant="link">링크 버튼</Button>
              <Button variant="accent">액센트 버튼</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">작은 버튼</Button>
              <Button>중간 버튼</Button>
              <Button size="lg">큰 버튼</Button>
            </div>
            <div className="pt-2">
              <Button isLoading>로딩 버튼</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-neutral-700">인풋 컴포넌트</h3>
            <div className="space-y-4">
              <Input
                placeholder="기본 인풋"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input placeholder="작은 인풋" size="sm" />
              <Input placeholder="중간 인풋" size="md" />
              <Input placeholder="큰 인풋" size="lg" />
              <Input placeholder="에러 상태 인풋" error="이 필드는 필수입니다" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-neutral-700">텍스트에어리어 컴포넌트</h3>
            <div className="space-y-4">
              <TextArea
                placeholder="기본 텍스트에어리어"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <TextArea
                placeholder="에러 상태 텍스트에어리어"
                rows={4}
                error="이 필드는 필수입니다"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="border-b pb-3 text-2xl font-semibold text-neutral-800">색상 팔레트</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="bg-primary flex h-20 items-end rounded-md p-2">
                <span className="text-sm font-medium text-white">Primary</span>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-full rounded-md bg-primary-light"></div>
                <div className="h-10 w-full rounded-md bg-primary-dark"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex h-20 items-end rounded-md bg-secondary p-2">
                <span className="text-sm font-medium text-white">Secondary</span>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-full rounded-md bg-secondary-light"></div>
                <div className="h-10 w-full rounded-md bg-secondary-dark"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex h-20 items-end rounded-md bg-accent p-2">
                <span className="text-sm font-medium text-neutral-800">Accent</span>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-full rounded-md bg-accent-light"></div>
                <div className="h-10 w-full rounded-md bg-accent-dark"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex h-20 items-end rounded-md bg-background p-2">
                <span className="text-sm font-medium text-neutral-800">Background</span>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-full rounded-md bg-background"></div>
                <div className="flex h-10 w-full items-center justify-center rounded-md bg-background-dark">
                  <span className="text-xs text-white">Dark</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
