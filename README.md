# 🏆 AgendaGol - Frontend

Frontend moderno para el sistema de reservas de canchas de fútbol AgendaGol.

## 🚀 Stack Tecnológico

- **Next.js 15+** (App Router) con TypeScript
- **Tailwind CSS** para estilos
- **Zustand** para manejo de estado global
- **Axios** para comunicación con APIs
- **React Hook Form + Zod** para formularios
- **Framer Motion** para animaciones
- **Lucide React** para iconos
- **SweetAlert2** para notificaciones

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd Front-reservas

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con las URLs de los microservicios

# Ejecutar en desarrollo
npm run dev
```

## ⚙️ Variables de Entorno

```env
NEXT_PUBLIC_AUTH_URL=http://localhost:8000
NEXT_PUBLIC_ROLES_URL=http://localhost:8001
NEXT_PUBLIC_FIELDS_URL=http://localhost:8002
NEXT_PUBLIC_RESERVATIONS_URL=http://localhost:8003
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:8004
NEXT_PUBLIC_APP_NAME=AgendaGol
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (páginas)
│   ├── dashboard/          # Dashboard (protegido)
│   ├── fields/             # Listado y detalle de canchas
│   ├── login/              # Inicio de sesión
│   ├── register/           # Registro
│   └── reservations/       # Reservas del usuario
├── components/             # Componentes reutilizables
│   ├── layout/             # Navbar, Sidebar
│   └── ui/                 # Button, Input, Card, Modal
├── lib/                    # Utilidades (HTTP client)
├── modules/                # Módulos de la aplicación
│   ├── auth/               # Autenticación
│   ├── dashboard/          # Dashboard
│   ├── fields/             # Canchas
│   └── reservations/       # Reservas
└── store/                  # Estado global (Zustand)
```

## 🔐 Autenticación

- JWT almacenado en cookies (`access_token`)
- Middleware de protección de rutas (`/dashboard`, `/reservations`)
- Redirección automática a login si no autenticado
- Store de Zustand con persistencia

## 📱 Páginas

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/` | Landing page | ❌ |
| `/login` | Inicio de sesión | ❌ |
| `/register` | Registro de usuario | ❌ |
| `/fields` | Listado de canchas | ❌ |
| `/fields/[id]` | Detalle y disponibilidad | ❌ |
| `/dashboard` | Panel de control | ✅ |
| `/reservations` | Mis reservas | ✅ |
| `/reservations/new` | Nueva reserva | ✅ |

## 🎨 Decisiones Técnicas

1. **Arquitectura Modular**: Cada módulo (`auth`, `fields`, `reservations`, `dashboard`) contiene sus propios:
   - `types/` - Definiciones TypeScript
   - `services/` - Comunicación con backend
   - `hooks/` - Lógica de negocio
   - `views/` - Componentes de vista
   - `components/` - Componentes específicos

2. **Split Pattern (Page/View)**: Las páginas (`page.tsx`) son Server Components que solo exportan metadata y renderizan la View como Client Component.

3. **Strict Mode Guard**: Uso de `useRef` en efectos para evitar dobles peticiones en React Strict Mode.

4. **HTTP Client Singleton**: Cliente Axios centralizado con interceptores para JWT y manejo de errores.

5. **Diseño Premium**: 
   - Glassmorphism y gradientes
   - Animaciones con Framer Motion
   - Dark mode nativo
   - Diseño responsive

## 🧪 Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Iniciar producción
npm run lint     # Linter
```

## 📋 Reglas de Negocio Implementadas

- ✅ Reservas de 1 o 2 horas únicamente
- ✅ Máximo 30 días de anticipación
- ✅ Horario 10:00 AM - 10:00 PM
- ✅ Solo horas exactas (sin minutos)
- ✅ Usuarios deben estar autenticados para reservar

## 🔗 Backend

Este frontend consume los microservicios del proyecto [agendaGol](https://github.com/javiermercado1/agendaGol).

Para levantar el backend:
```bash
cd agendaGol
make init
```

---

Desarrollado para la prueba técnica de Naowee.
# Canchas
