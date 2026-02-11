'use client';
import clsx from 'clsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Suspense, useState } from 'react';
import './nav.css';
import { useRouter } from "next/navigation";

export function GlobalNav({
  items,
}: {
  items: Array<{ group: string; name: string; href: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const router = useRouter();

  const grouped = Object.values(
    items.reduce((acc: any, item) => {
      if (!acc[item.group]) acc[item.group] = { group: item.group, items: [] };
      acc[item.group].items.push(item);
      return acc;
    }, {})
  );


  return (
    <>
      <div className="nav-header">
        <Link href="/members" className="nav-logo" onClick={close}>
          <div className="nav-logo-circle"></div>
          <h3 className="nav-title">VipCore</h3>
        </Link>
      </div>

      <button
        type="button"
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="nav-toggle-text"></span>
        {isOpen ? (
          <XMarkIcon className="nav-toggle-icon" />
        ) : (
          <Bars3Icon className="nav-toggle-icon" />
        )}
      </button>

      <div
        className={clsx('nav-container', {
          'nav-open': isOpen,
          'nav-closed': !isOpen,
        })}
      >
        <button
          type="button"
          className="button-logout"
          onClick={() => {
            document.cookie = "auth_token=; Max-Age=0; path=/;";
            router.push("/");
            setIsOpen(!isOpen);
          }}
        >
          Logout

        </button>




        <nav className="nav-sections">
          {grouped.map((section: any) => (
            <div key={section.group} className="nav-section">
              <div className="nav-section-title">{section.group}</div>

              <div className="nav-section-items">
                {section.items.map((item: any) => (
                  <Suspense
                    key={item.href}
                    fallback={<NavItem item={item} close={close} />}
                  >
                    <DynamicNavItem item={item} close={close} />
                  </Suspense>
                ))}
              </div>
            </div>
          ))}
        </nav>

      </div>
    </>
  );
}

function DynamicNavItem({
  item,
  close,
}: {
  item: any;
  close: () => void;
}) {
  const segment = useSelectedLayoutSegments();
  const isActive = item.name.toLowerCase() === (segment[1] ? segment[1] : segment[0]);
  return <NavItem item={item} close={close} isActive={isActive} />;
}

function NavItem({
  item,
  close,
  isActive,
}: {
  item: any;
  close: () => void;
  isActive?: boolean;
}) {
  return (
    <Link
      onClick={close}
      href={item.href}
      className={clsx('nav-item', {
        'nav-item-active': isActive,
      })}
    >
      {item.name}
    </Link>
  );
}
