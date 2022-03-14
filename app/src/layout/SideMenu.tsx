import { Icon, Layout as AntLayout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import logo from '../assets/logo-white.png';
import ClientResourcesEnum from '../config/client';
import { BackOfficeTypeCode, SettlementTypeCode } from '../config/constants';
import MenuKeysEnum from '../config/menu-keys';
import { ResourcesEnum } from '../config/resources';
import Translations from '../locales/translations';
import { IGlobalState } from '../state';
import { toggleCollapse } from '../state/app/actions';
import { IActionsApp, IActionToggleCollapse } from '../state/app/types';
import { getAuthProfile, IProfile } from '../state/auth';

export interface MenuItem {
  key: MenuKeysEnum;
  path?: string;
  title: string;
  icon: string;
  resources?: string[];
  submenu?: MenuItem[];
  target?: string;
}

interface SideMenuProps {
  isCollapsed: boolean;
  profile?: IProfile;
  onToggleCollapse: () => IActionToggleCollapse;
}

class SideMenu extends React.Component<SideMenuProps & RouteComponentProps> {
  private menuItems: MenuItem[] = [
    {
      key: MenuKeysEnum.ROOT,
      path: ClientResourcesEnum.ROOT,
      title: Translations.TEXT_DASHBOARD,
      icon: 'appstore',
    },
    {
      key: MenuKeysEnum.USERS,
      title: Translations.TEXT_USERS,
      resources: [ResourcesEnum.USER],
      icon: 'user',
      submenu: [
        {
          key: MenuKeysEnum.USERS,
          path: ClientResourcesEnum.USERS,
          title: Translations.TEXT_USERS_ADMIN,
          resources: [ResourcesEnum.USER],
          icon: 'user',
        },
        {
          key: MenuKeysEnum.USERS,
          path: `${ClientResourcesEnum.USERS}?type=${BackOfficeTypeCode.SHOP}`,
          title: Translations.TEXT_USERS_SHOP,
          resources: [ResourcesEnum.USER],
          icon: 'shop',
        },
        {
          key: MenuKeysEnum.USERS,
          path: `${ClientResourcesEnum.USERS}?type=${
            BackOfficeTypeCode.RESELLER
          }`,
          title: Translations.TEXT_USERS_RESELLER,
          resources: [ResourcesEnum.USER],
          icon: 'share-alt',
        },
      ],
    },
    {
      key: MenuKeysEnum.ROLES,
      path: ClientResourcesEnum.ROLES,
      title: Translations.TEXT_ROLES,
      resources: [ResourcesEnum.ROLE],
      icon: 'safety-certificate',
    },
    {
      key: MenuKeysEnum.AGENCIES,
      path: ClientResourcesEnum.AGENCIES,
      title: Translations.TEXT_AGENCIES,
      resources: [ResourcesEnum.AGENCY],
      icon: 'database',
    },
    {
      key: MenuKeysEnum.CAMPAIGNS,
      path: ClientResourcesEnum.CAMPAIGNS,
      title: Translations.TEXT_CAMPAIGNS,
      resources: [ResourcesEnum.CAMPAIGN],
      icon: 'database',
    },
    // {
    //   key: MenuKeysEnum.WITHDRAWALS,
    //   path: ClientResourcesEnum.WITHDRAWALS,
    //   title: Translations.TEXT_WITHDRAWALS,
    //   resources: [ResourcesEnum.WITHDRAWALS],
    //   icon: 'dollar',
    // },
    {
      key: MenuKeysEnum.LEADS,
      title: Translations.TEXT_LEADS,
      resources: [ResourcesEnum.LEAD, ResourcesEnum.MERCHANT],
      icon: 'deployment-unit',
      submenu: [
        {
          key: MenuKeysEnum.LEADS,
          path: ClientResourcesEnum.LEADS,
          title: Translations.TEXT_LEADS,
          resources: [ResourcesEnum.LEAD],
          icon: 'deployment-unit',
        },
        {
          key: MenuKeysEnum.REGISTER_IN_PROCESS,
          path: ClientResourcesEnum.LEADS_PENDING_MERCHANTS,
          title: Translations.TEXT_REGISTER_IN_PROCESS_MERCHANTS,
          resources: [ResourcesEnum.MERCHANT],
          icon: 'play-circle',
        },
      ],
    },
    {
      key: MenuKeysEnum.MERCHANTS,
      title: Translations.TEXT_MERCHANTS,
      resources: [ResourcesEnum.MERCHANT],
      icon: 'deployment-unit',
      submenu: [
        {
          key: MenuKeysEnum.MERCHANTS,
          path: ClientResourcesEnum.MERCHANTS,
          title: Translations.TEXT_GENERAL_MERCHANTS,
          resources: [ResourcesEnum.MERCHANT],
          icon: 'deployment-unit',
        },
        {
          key: MenuKeysEnum.BANKING_INFO_REQUESTS,
          path: ClientResourcesEnum.BANKING_INFO_REQUESTS,
          title: Translations.TEXT_BANKING_INFO_REQUEST,
          resources: [ResourcesEnum.BANKING_INFO_REQUEST],
          icon: 'unordered-list',
        },
        {
          key: MenuKeysEnum.MERCHANT_LIMIT_RULES,
          path: ClientResourcesEnum.MERCHANT_LIMIT_RULES,
          title: Translations.SIDEMENU_MERCHANT_LIMIT_RULES,
          resources: [ResourcesEnum.MERCHANT_LIMIT_RULE],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.ALERT_MERCHANT_LIMIT_RULES,
          path: ClientResourcesEnum.ALERT_MERCHANT_LIMIT_RULES,
          title: Translations.SIDEMENU_ALERT_MERCHANT_LIMIT_RULES,
          resources: [ResourcesEnum.MERCHANT],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.MERCHANT_INTEGRATION_TYPE,
          path: ClientResourcesEnum.MERCHANT_INTEGRATION_TYPES,
          title: Translations.TEXT_MERCHANT_INTEGRATION_TYPES,
          resources: [ResourcesEnum.MERCHANT_INTEG_TYPE],
          icon: 'tool',
        },
      ],
    },
    {
      key: MenuKeysEnum.GATEWAYS,
      path: ClientResourcesEnum.GATEWAYS,
      title: Translations.TEXT_GATEWAYS,
      resources: [ResourcesEnum.GATEWAY],
      icon: 'unordered-list',
    },
    {
      key: MenuKeysEnum.SHOPS,
      title: Translations.TEXT_SHOPS,
      resources: [ResourcesEnum.SHOP, ResourcesEnum.ANTI_FRAUD_PROVIDER],
      icon: 'shop',
      submenu: [
        {
          key: MenuKeysEnum.SHOPS,
          path: ClientResourcesEnum.SHOPS,
          title: Translations.TEXT_SHOPS,
          resources: [ResourcesEnum.SHOP],
          icon: 'shop',
        },
        {
          key: MenuKeysEnum.ANTI_FRAUD_PROVIDER_KEYS,
          path: ClientResourcesEnum.ANTI_FRAUD_PROVIDER_KEYS,
          title: Translations.SIDEMENU_ANTI_FRAUD_PROVIDER_KEYS,
          resources: [ResourcesEnum.ANTI_FRAUD_PROVIDER],
          icon: 'solution',
        },
      ],
    },
    {
      key: MenuKeysEnum.SETTLEMENTS,
      title: Translations.TEXT_SETTLEMENTS,
      resources: [ResourcesEnum.SETTLEMENT, ResourcesEnum.ADJUSTMENT_ST],
      icon: 'solution',
      submenu: [
        {
          key: MenuKeysEnum.SETTLEMENTS,
          title: Translations.TEXT_SETTLEMENTS_SIDE_MENU,
          path: ClientResourcesEnum.SETTLEMENTS,
          resources: [ResourcesEnum.SETTLEMENT],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.SETTLEMENTS_CC,
          title: Translations.TEXT_SETTLEMENTS_CC_SIDE_MENU,
          path: ClientResourcesEnum.SETTLEMENTS_CC,
          resources: [ResourcesEnum.SETTLEMENT_CC],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.SETTLEMENTS_TASKS,
          title: Translations.TEXT_SETTLEMENTS_TASKS_SIDE_MENU,
          path: `${ClientResourcesEnum.SETTLEMENTS_TASKS}?type=${SettlementTypeCode.GENERAL}`,
          resources: [ResourcesEnum.SETTLEMENT],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.SETTLEMENTS_TASKS_CC,
          title: Translations.TEXT_SETTLEMENTS_TASKS_CC_SIDE_MENU,
          path: `${ClientResourcesEnum.SETTLEMENTS_TASKS}?type=${SettlementTypeCode.CREDIT_CARD}`,
          resources: [ResourcesEnum.SETTLEMENT],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.ADJUSTMENT,
          title: Translations.TEXT_ADJUSTMENTS,
          path: ClientResourcesEnum.ADJUSTMENTS,
          resources: [ResourcesEnum.ADJUSTMENT_ST],
          icon: 'tool',
        },
      ],
    },
    {
      key: MenuKeysEnum.PAYOUTS,
      title: Translations.TEXT_PAYOUTS,
      resources: [ResourcesEnum.PAYOUT],
      icon: 'dollar',
      submenu: [
        {
          key: MenuKeysEnum.PAYOUTS_DASHBOARD,
          path: ClientResourcesEnum.PAYOUTS_DASHBOARD,
          title: Translations.TEXT_DASHBOARD,
          resources: [ResourcesEnum.PAYOUT],
          icon: 'appstore',
        },
        {
          key: MenuKeysEnum.PAYOUTS_GRID,
          path: ClientResourcesEnum.PAYOUTS,
          title: Translations.TEXT_PAYOUTS,
          resources: [ResourcesEnum.PAYOUT],
          icon: 'dollar',
        },
        {
          key: MenuKeysEnum.PAYOUTS_GRID_V2,
          path: ClientResourcesEnum.PAYOUTS_V2,
          title: Translations.TEXT_PAYOUTS_V2,
          resources: [ResourcesEnum.PAYOUT],
          icon: 'dollar',
        },
        {
          key: MenuKeysEnum.PAYOUT_FILES_COLOMBIA_GRID,
          path: ClientResourcesEnum.PAYOUTS_FILES_COLOMBIA,
          title: Translations.TEXT_PAYOUTS_FILES_COLOMBIA,
          resources: [ResourcesEnum.PAYOUT, ResourcesEnum.PAYOUT_FILE_COLOMBIA],
          icon: 'dollar',
        },
        {
          key: MenuKeysEnum.PAYOUTS_EXPIRED,
          path: ClientResourcesEnum.PAYOUTS_EXPIRED,
          title: Translations.TEXT_PAYOUTS_EXPIRED,
          resources: [ResourcesEnum.PAYOUT],
          icon: 'alert',
        },
      ],
    },
    {
      key: MenuKeysEnum.REFUNDS,
      title: Translations.TEXT_REFUNDS,
      resources: [ResourcesEnum.REFUND],
      icon: 'appstore',
      submenu: [
        {
          key: MenuKeysEnum.REFUNDS,
          path: ClientResourcesEnum.REFUNDS,
          title: Translations.TEXT_REFUNDS,
          resources: [ResourcesEnum.REFUND],
          icon: 'appstore',
        },
        {
          key: MenuKeysEnum.REFUNDS_DIRECT_WIRE,
          path: ClientResourcesEnum.DIRECT_WIRES,
          title: Translations.TEXT_DIRECT_WIRES,
          resources: [ResourcesEnum.REFUND],
          icon: 'appstore',
        },
      ],
    },
    {
      key: MenuKeysEnum.VIRTUAL_CARDS,
      path: ClientResourcesEnum.VIRTUAL_CARDS,
      title: Translations.TEXT_VIRTUAL_CARDS,
      resources: [ResourcesEnum.VIRTUAL_CARD],
      icon: 'credit-card',
      submenu: [
        {
          key: MenuKeysEnum.VIRTUAL_CARDS,
          path: ClientResourcesEnum.VIRTUAL_CARDS,
          title: Translations.TEXT_VIRTUAL_CARDS,
          resources: [ResourcesEnum.VIRTUAL_CARD],
          icon: 'credit-card',
        },
        {
          key: MenuKeysEnum.VCARD_PAYOUT_REQUESTS,
          path: ClientResourcesEnum.VCARD_PAYOUT_REQUESTS,
          title: Translations.TEXT_VCARD_PAYOUT_REQUESTS,
          resources: [ResourcesEnum.VCARD_PAYOUT_REQUEST],
          icon: 'dollar',
        },
      ],
    },
    {
      key: MenuKeysEnum.CLAIMS,
      path: ClientResourcesEnum.CLAIMS,
      title: Translations.TEXT_CLAIMS,
      resources: [ResourcesEnum.CLAIM],
      icon: 'reconciliation',
      submenu: [
        {
          key: MenuKeysEnum.CLAIMS_DASHBOARD,
          path: ClientResourcesEnum.CLAIMS_DASHBOARD,
          title: Translations.TEXT_DASHBOARD,
          resources: [ResourcesEnum.CLAIM],
          icon: 'appstore',
        },
        {
          key: MenuKeysEnum.CLAIMS,
          path: ClientResourcesEnum.CLAIMS,
          title: Translations.TEXT_CLAIMS,
          resources: [ResourcesEnum.CLAIM],
          icon: 'reconciliation',
        },
      ],
    },
    {
      key: MenuKeysEnum.OPERATIONS,
      path: ClientResourcesEnum.OPERATIONS,
      title: Translations.TEXT_OPERATIONS,
      resources: [ResourcesEnum.OPERATION],
      icon: 'unordered-list',
    },
    {
      key: MenuKeysEnum.PAYMENT_ORDERS,
      path: ClientResourcesEnum.PAYMENT_ORDERS,
      title: Translations.TEXT_PAYMENT_ORDERS,
      resources: [ResourcesEnum.PAYMENT_ORDER],
      icon: 'dollar',
    },
    {
      key: MenuKeysEnum.TRANSACTIONS,
      path: ClientResourcesEnum.TRANSACTIONS,
      title: Translations.TEXT_TRANSACTIONS,
      resources: [ResourcesEnum.TRANSACTION],
      icon: 'credit-card',
      submenu: [
        {
          key: MenuKeysEnum.TRANSACTIONS_DASHBOARD,
          path: ClientResourcesEnum.TRANSACTIONS_DASHBOARD,
          title: Translations.TEXT_DASHBOARD,
          resources: [ResourcesEnum.TRANSACTION],
          icon: 'appstore',
        },
        {
          key: MenuKeysEnum.TRANSACTIONS_GRID_V2,
          path: ClientResourcesEnum.TRANSACTIONS,
          title: Translations.TEXT_TRANSACTIONS,
          resources: [ResourcesEnum.TRANSACTION],
          icon: 'credit-card',
        },
        {
          key: MenuKeysEnum.MONTHLY_APPROVED_TRANSACTIONS,
          path: ClientResourcesEnum.TRANSACTIONS_REPORTS,
          title: Translations.TEXT_TRANSACTIONS_REPORTS,
          resources: [ResourcesEnum.MONTHLY_APPROVED_TRANSACTIONS],
          icon: 'check-circle',
        },
      ],
    },
    {
      key: MenuKeysEnum.NOTIFICATIONS,
      title: Translations.TEXT_NOTIFICATIONS,
      resources: [ResourcesEnum.NOTIFICATION, ResourcesEnum.CUSTOMER_SEND_NOTI],
      icon: 'notification',
      submenu: [
        {
          key: MenuKeysEnum.CUSTOMER_NOTIFICATIONS,
          path: ClientResourcesEnum.CUSTOMER_NOTIFICATIONS,
          title: Translations.TEXT_CUSTOMER,
          resources: [ResourcesEnum.CUSTOMER_SEND_NOTI],
          icon: 'notification',
        },
        {
          key: MenuKeysEnum.NOTIFICATIONS,
          path: ClientResourcesEnum.NOTIFICATIONS,
          title: Translations.TEXT_TRANSACTIONS,
          resources: [ResourcesEnum.NOTIFICATION],
          icon: 'notification',
        },
        {
          key: MenuKeysEnum.OLD_NOTIFICATIONS,
          path: ClientResourcesEnum.OLD_NOTIFICATIONS,
          title: Translations.TEXT_OLD_TRANSACTIONS,
          resources: [ResourcesEnum.NOTIFICATION],
          icon: 'notification',
        },
        {
          key: MenuKeysEnum.PAYOUT_NOTIFICATIONS,
          path: ClientResourcesEnum.PAYOUT_NOTIFICATIONS,
          title: Translations.TEXT_PAYOUTS,
          resources: [ResourcesEnum.PAYOUT_NOTIFICATION],
          icon: 'notification',
        },
      ],
    },
    {
      key: MenuKeysEnum.ONLINE_NOTIFICATIONS,
      title: Translations.TEXT_ONLINE_NOTIFICATIONS,
      resources: [
        ResourcesEnum.BANCO_PLURAL,
        ResourcesEnum.SPEI,
        ResourcesEnum.BANKLY_NOTIFICATION,
      ],
      icon: 'credit-card',
      submenu: [
        {
          key: MenuKeysEnum.BANCO_PLURAL_NOTIFICATIONS,
          path: ClientResourcesEnum.BANCO_PLURAL_NOTIFICATION,
          title: Translations.TEXT_BANCO_PLURAL_NOTIFICATIONS,
          resources: [ResourcesEnum.BANCO_PLURAL],
          icon: 'credit-card',
        },
        {
          key: MenuKeysEnum.SPEI_NOTIFICATIONS,
          path: ClientResourcesEnum.SPEI_NOTIFICATION,
          title: Translations.TEXT_SPEI_NOTIFICATIONS,
          resources: [ResourcesEnum.SPEI],
          icon: 'credit-card',
        },
        {
          key: MenuKeysEnum.BANKLY_NOTIFICATIONS,
          path: ClientResourcesEnum.BANKLY_NOTIFICATION,
          title: Translations.TEXT_BANKLY_NOTIFICATIONS,
          resources: [ResourcesEnum.BANKLY_NOTIFICATION],
          icon: 'credit-card',
        },
      ],
    },
    {
      key: MenuKeysEnum.PARTNERS_BO,
      title: Translations.TEXT_PARTNERS_BO,
      icon: 'unordered-list',
      submenu: [
        {
          key: MenuKeysEnum.BANKLY,
          title: Translations.TEXT_BANKLY,
          path: ClientResourcesEnum.BANKLY_EVENT,
          resources: [
            ResourcesEnum.BANKLY_EVENT,
            ResourcesEnum.COMPANY_PAYOUT,
            ResourcesEnum.BANKLY_BALANCE,
          ],
          icon: 'unordered-list',
        },
        {
          key: MenuKeysEnum.REMITEES,
          path: ClientResourcesEnum.REMITEE,
          title: Translations.TEXT_REMITEE,
          resources: [ResourcesEnum.REMITEE],
          icon: 'unordered-list',
        },
      ],
    },
    {
      key: MenuKeysEnum.CUSTOMER_PAYOUTS,
      title: 'Customers',
      resources: [
        ResourcesEnum.PAYOUT,
        ResourcesEnum.MERCHANT_CUSTOMER,
        ResourcesEnum.CUSTOMER_BLACKLIST,
        ResourcesEnum.CUSTOMER_WHITELIST,
        ResourcesEnum.CUSTOMER_LIMIT_RULE,
        ResourcesEnum.RELATED_USER_FINDER,
      ],
      icon: 'team',
      submenu: [
        {
          key: MenuKeysEnum.CUSTOMER_PAYOUTS_DASHBOARD,
          path: ClientResourcesEnum.CUSTOMER_PAYOUT_DASHBOARD,
          title: Translations.TEXT_DASHBOARD,
          resources: [ResourcesEnum.PAYOUT],
          icon: 'appstore',
        },
        {
          key: MenuKeysEnum.CUSTOMER_PAYOUTS,
          path: ClientResourcesEnum.CUSTOMER_PAYOUT,
          title: Translations.SIDEMENU_CUSTOMER_PAYOUTS,
          resources: [ResourcesEnum.PAYOUT],
          icon: 'dollar',
        },
        {
          key: MenuKeysEnum.MERCHANT_CUSTOMERS,
          path: ClientResourcesEnum.MERCHANT_CUSTOMER,
          title: Translations.SIDEMENU_MERCHANT_CUSTOMER,
          resources: [ResourcesEnum.MERCHANT_CUSTOMER],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.CUSTOMER_BLACKLISTS,
          path: ClientResourcesEnum.CUSTOMER_BLACKLIST,
          title: Translations.SIDEMENU_CUSTOMER_BLACKLIST,
          resources: [ResourcesEnum.CUSTOMER_BLACKLIST],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.CUSTOMER_WHITELISTS,
          path: ClientResourcesEnum.CUSTOMER_WHITELIST,
          title: Translations.SIDEMENU_CUSTOMER_WHITELIST,
          resources: [ResourcesEnum.CUSTOMER_WHITELIST],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.CUSTOMER_LIMIT_RULES,
          path: ClientResourcesEnum.CUSTOMER_LIMIT_RULES,
          title: Translations.SIDEMENU_CUSTOMER_LIMIT_RULES,
          resources: [ResourcesEnum.CUSTOMER_LIMIT_RULE],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.ALERT_CUSTOMER_LIMIT_RULES,
          path: ClientResourcesEnum.ALERT_CUSTOMER_LIMIT_RULES,
          title: Translations.SIDEMENU_ALERT_CUSTOMER_LIMIT_RULES,
          resources: [ResourcesEnum.CUSTOMER_LIMIT_RULE],
          icon: 'solution',
        },
        {
          key: MenuKeysEnum.RELATED_USERS_FINDER,
          path: ClientResourcesEnum.RELATED_USERS_FINDER,
          title: Translations.TEXT_RELATED_USERS_FINDER,
          resources: [ResourcesEnum.RELATED_USER_FINDER],
          icon: 'search',
        },
      ],
    },
    {
      key: MenuKeysEnum.FXS_REPORT,
      title: Translations.TEXT_FXS_REPORT,
      resources: [ResourcesEnum.TRANSACTION, ResourcesEnum.PAYOUT],
      icon: 'dollar',
      submenu: [
        {
          key: MenuKeysEnum.FXS_REPORT,
          path: ClientResourcesEnum.FXS_REPORT,
          title: Translations.TEXT_TRANSACTION_FXS,
          resources: [ResourcesEnum.TRANSACTION],
          icon: 'dollar',
        },
        {
          key: MenuKeysEnum.PAYOUT_FXS,
          path: ClientResourcesEnum.PAYOUT_FXS,
          title: Translations.TEXT_PAYOUT_FXS,
          resources: [ResourcesEnum.PAYOUT],
          icon: 'dollar',
        },
      ],
    },

    {
      key: MenuKeysEnum.REPORT_TASKS,
      path: ClientResourcesEnum.REPORT_TASKS,
      title: Translations.TEXT_REPORT_TASKS,
      resources: [ResourcesEnum.REPORT_TASK],
      icon: 'file-sync',
    },
    {
      key: MenuKeysEnum.CONVERTERS,
      path: ClientResourcesEnum.CONVERTERS,
      title: Translations.TEXT_CONVERTERS,
      resources: [ResourcesEnum.CONVERTER],
      icon: 'build',
    },
    {
      key: MenuKeysEnum.PAYMENT_METHODS,
      path: ClientResourcesEnum.PAYMENT_METHODS,
      title: Translations.TEXT_PAYMENT_METHODS,
      resources: [ResourcesEnum.PAYMENT_METHOD],
      icon: 'build',
      submenu: [
        {
          key: MenuKeysEnum.PAYMENT_METHODS,
          path: ClientResourcesEnum.PAYMENT_METHODS,
          title: Translations.TEXT_GENERAL_PAYMENT_METHODS,
          resources: [ResourcesEnum.PAYMENT_METHOD],
          icon: 'build',
        },
        {
          key: MenuKeysEnum.ALERT_TRANSACTION_PAYMENT_METHODS,
          path: ClientResourcesEnum.ALERT_TRANSACTION_PAYMENT_METHODS,
          title: Translations.SIDEMENU_ALERT_TRANSACTION_PAYMENT_METHODS,
          resources: [ResourcesEnum.PAYMENT_METHOD],
          icon: 'solution',
        },
      ],
    },
    {
      key: MenuKeysEnum.PAYOUT_PROCESSORS,
      path: ClientResourcesEnum.PAYOUT_PROCESSORS,
      title: Translations.TEXT_PAYOUT_PROCESSORS,
      resources: [ResourcesEnum.PAYOUT_PROCESSOR],
      icon: 'build',
    },
    {
      key: MenuKeysEnum.PARTNERS,
      path: ClientResourcesEnum.PARTNERS,
      title: Translations.TEXT_PARTNERS,
      resources: [ResourcesEnum.PARTNER],
      icon: 'build',
    },
    // {
    //   key: MenuKeysEnum.INTERNAL_COMPANIES,
    //   path: ClientResourcesEnum.INTERNAL_COMPANIES,
    //   title: Translations.TEXT_INTERNAL_COMPANIES,
    //   resources: [ResourcesEnum.INTERNAL_COMPANY],
    //   icon: 'home',
    // },
    {
      key: MenuKeysEnum.REFERRALS,
      path: ClientResourcesEnum.REFERRALS,
      title: Translations.TEXT_REFERRALS,
      resources: [ResourcesEnum.REFERRAL],
      icon: 'usergroup-add',
    },
    {
      key: MenuKeysEnum.DOCUMENT_TYPE,
      path: ClientResourcesEnum.DOCUMENT_TYPE,
      title: Translations.TEXT_DOCUMENT_TYPE,
      resources: [ResourcesEnum.DOCUMENT_TYPE],
      icon: 'snippets',
    },
    {
      key: MenuKeysEnum.BOLETO_BRAZIL,
      path: ClientResourcesEnum.BOLETO_BRAZIL,
      title: Translations.TEXT_BOLETO_BRAZIL,
      resources: [ResourcesEnum.BOLETO_BRAZIL],
      icon: 'upload',
    },
    {
      key: MenuKeysEnum.ALERT_BANK_PROCESS_RETURN_FILES,
      path: ClientResourcesEnum.ALERT_BANK_PROCESS_RETURN_FILE,
      title: Translations.SIDEMENU_ALERT_BANK_PROCESS_RETURN_FILE,
      resources: [ResourcesEnum.ALERT_BANK_PROCESS],
      icon: 'solution',
    },
    {
      key: MenuKeysEnum.DASHBOARD_TV,
      path: ClientResourcesEnum.DASHBOARD_TV,
      title: Translations.TEXT_DASHBOARD_TV,
      resources: [ResourcesEnum.DASHBOARD_TV],
      target: '_blank',
      icon: 'desktop',
    },
    {
      key: MenuKeysEnum.SQL_CONSOLE,
      path: ClientResourcesEnum.SQL_CONSOLE,
      title: Translations.TEXT_SQL_CONSOLE,
      resources: [ResourcesEnum.SQL_CONSOLE],
      icon: 'code-o',
    },
    {
      key: MenuKeysEnum.TASK_SERVICES,
      path: ClientResourcesEnum.TASK_SERVICES,
      title: Translations.TEXT_TASK_SERVICES,
      resources: [ResourcesEnum.TASK_SERVICE],
      icon: 'file-sync',
    },
    {
      key: MenuKeysEnum.SEARCH_INTEGRATIONS,
      path: ClientResourcesEnum.SEARCH_INTEGRATIONS,
      title: Translations.TEXT_SEARCH_INTEGRATIONS,
      resources: [ResourcesEnum.SEARCH_INTEGRATION],
      icon: 'zoom-in',
    },
    {
      key: MenuKeysEnum.BANCO_BRAZIL_SIAFILES,
      path: ClientResourcesEnum.BANCO_BRAZIL_SIAFILES,
      title: Translations.TEXT_BANCOBRAZIL_SIAFILES,
      resources: [ResourcesEnum.BANCOBRAZIL_SIAFILE],
      icon: 'file-text',
    },
    {
      key: MenuKeysEnum.EMAIL_DOMAINS,
      path: ClientResourcesEnum.EMAIL_DOMAINS,
      title: Translations.TEXT_EMAIL_DOMAINS,
      resources: [ResourcesEnum.EMAIL_DOMAIN],
      icon: 'mail',
    },
    {
      key: MenuKeysEnum.IPWHITELIST,
      path: ClientResourcesEnum.IP_WHITELIST,
      title: Translations.TEXT_IP_WHITELIST,
      resources: [ResourcesEnum.IP_WHITELIST],
      icon: 'mail',
    },
    // {
    //   key: MenuKeysEnum.TREASURY,
    //   title: Translations.TEXT_TREASURY,
    //   resources: [ResourcesEnum.TREASURY],
    //   icon: 'bank',
    //   submenu: [
    //     {
    //       key: MenuKeysEnum.TREASURY,
    //       path: ClientResourcesEnum.TREASURY,
    //       title: Translations.TEXT_TREASURY,
    //       resources: [ResourcesEnum.TREASURY],
    //       icon: 'read',
    //     },
    //   ],
    // },
  ];

  private getSubMenuToExpand = () => {
    const { location } = this.props;

    return this.menuItems
      .filter(item => item.submenu)
      .find(menuItem =>
        menuItem.submenu
          ? menuItem.submenu.some(
              subMenuItem =>
                !!subMenuItem.path && subMenuItem.path === location.pathname
            )
          : false
      );
  };

  private checkAccessToMenuItem = (menuItem: MenuItem) => {
    const { profile } = this.props;
    const { resources: menuResources } = menuItem;

    if (!profile) {
      return false;
    }

    if (!menuResources) {
      return true;
    }

    return menuResources.some(menuResource =>
      profile.role.resources.some(resource => resource.code === menuResource)
    );
  };

  private handleMenuItemClick = (e: any) => {
    e.stopPropagation();
  };

  private renderMenuItem = (item: MenuItem) => {
    let element = (
      <>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </>
    );

    if (item.path && !item.submenu) {
      element = (
        <Link
          to={item.path}
          onClick={this.handleMenuItemClick}
          target={item.target || ''}
        >
          {element}
        </Link>
      );
    }

    return <Menu.Item key={item.path}>{element}</Menu.Item>;
  };

  public render() {
    const { history, location, isCollapsed, onToggleCollapse } = this.props;
    const submenuToExpand = this.getSubMenuToExpand();

    const menu = (
      <AntLayout.Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={onToggleCollapse}
        style={{ height: 'inherit' }}
      >
        <Link to={ClientResourcesEnum.ROOT}>
          <img
            src={logo}
            alt="Pay Retailers"
            className="pa2 db"
            style={{ maxHeight: '5em', margin: '0 auto' }}
          />
        </Link>
        <Menu
          theme="dark"
          selectedKeys={[`${location.pathname}${location.search}`]}
          mode="inline"
          onClick={(e: ClickParam) => history.push(e.key)}
          defaultOpenKeys={
            (submenuToExpand && [submenuToExpand.key.toString()]) || []
          }
        >
          {this.menuItems
            .filter(item => this.checkAccessToMenuItem(item))
            .map(item =>
              !item.submenu ? (
                this.renderMenuItem(item)
              ) : (
                <Menu.SubMenu
                  key={item.key}
                  title={
                    <>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </>
                  }
                >
                  {item.submenu
                    .filter(subItem => this.checkAccessToMenuItem(subItem))
                    .map(subItem => this.renderMenuItem(subItem))}
                </Menu.SubMenu>
              )
            )}
        </Menu>
      </AntLayout.Sider>
    );

    return menu;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  isCollapsed: state.app.isSideMenuCollapsed,
  profile: getAuthProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IActionsApp>) => ({
  onToggleCollapse: (): IActionToggleCollapse => dispatch(toggleCollapse()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideMenu)
);
