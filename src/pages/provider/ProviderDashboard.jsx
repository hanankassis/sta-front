import SharedFooter from '../../components/Shared/SharedFooter';
import { Outlet } from 'react-router-dom';
import ProviderBar from '../../components/Provider/ProviderBar';
import ProviderNav from '../../components/Provider/ProviderNav';

export default function ProviderDashboard() {
  return (
    <div>
    <ProviderNav />
      <div className="provider-layout">
      <ProviderBar />

        <main className="provider-main min-vh100">
          <Outlet/>
        </main>
      </div>

      <SharedFooter />
    </div>
  )
}
