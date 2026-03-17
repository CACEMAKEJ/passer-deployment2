import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 md:px-6 lg:px-8 py-5 md:py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5">
        <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 text-sm text-gray-600 flex-wrap">
          <Link href="/privacy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-gray-900">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
