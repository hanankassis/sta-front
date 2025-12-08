import SharedFooter from '../../components/Shared/SharedFooter';
import { Outlet } from 'react-router-dom';
import ProviderBar from '../../components/provider/ProviderBar';
import ProviderHeader from '../../components/provider/ProviderHeader';

export default function ProviderDashboard() {
  return (
    <div>
    <ProviderHeader />
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
