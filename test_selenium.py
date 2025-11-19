from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import time

URL_BASE = "http://localhost:3000"
URL_REGISTRO = f"{URL_BASE}/registro"
URL_LOGIN = f"{URL_BASE}/iniciar-sesion"

chrome_options = Options()
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)
wait = WebDriverWait(driver, 15)

print("\n" + "="*80)
print("🔐 TEST AUTOMATIZADO: REGISTRO Y LOGIN CON 5+ USUARIOS")
print("="*80 + "\n")

# ✅ 5 USUARIOS CON CONTRASEÑAS DE 4-10 CARACTERES
usuarios = [
    {
        "nombre": "Juan Pérez García",
        "email": "juan@duoc.cl",
        "password": "Pass1234",  # 8 caracteres
        "region": "Región Metropolitana de Santiago",
        "comuna": "La Florida"
    },
    {
        "nombre": "María García López",
        "email": "maria@profesor.duoc.cl",
        "password": "MariA567",  # 8 caracteres
        "region": "Región Metropolitana de Santiago",
        "comuna": "La Florida"
    },
    {
        "nombre": "Carlos López Méndez",
        "email": "carlos@duoc.cl",
        "password": "Car1990",  # 7 caracteres
        "region": "Región Metropolitana de Santiago",
        "comuna": "La Florida"
    },
    {
        "nombre": "Ana Rodríguez Torres",
        "email": "ana@profesor.duoc.cl",
        "password": "Ana2025A",  # 8 caracteres
        "region": "Región Metropolitana de Santiago",
        "comuna": "La Florida"
    },
    {
        "nombre": "Diego Fernández Silva",
        "email": "diego@duoc.cl",
        "password": "Diego99",  # 7 caracteres
        "region": "Región Metropolitana de Santiago",
        "comuna": "La Florida"
    }
]

# CONTADORES DE RESULTADOS
registro_exitosos = 0
registro_fallidos = 0
login_exitosos = 0
login_fallidos = 0

try:
    # ============================================================
    # PARTE 1: REGISTRO DE USUARIOS
    # ============================================================
    print("📝 PARTE 1: REGISTRO DE USUARIOS\n")
    print(f"{'Usuario':<30} {'Email':<30} {'Estado':<20}")
    print("-" * 80)
    
    for usuario in usuarios:
        try:
            driver.get(URL_REGISTRO)
            time.sleep(2)
            
            # 1️⃣ Nombre completo
            nombre_field = wait.until(EC.presence_of_element_located(
                (By.CSS_SELECTOR, "input[placeholder*='nombre'], input[name='nombre'], input[placeholder*='Nombre']")
            ))
            nombre_field.clear()
            nombre_field.send_keys(usuario["nombre"])
            time.sleep(0.5)
            
            # 2️⃣ Email
            email_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
            email_field.clear()
            email_field.send_keys(usuario["email"])
            time.sleep(0.5)
            
            # 3️⃣ Confirmar email
            inputs_email = driver.find_elements(By.CSS_SELECTOR, "input[type='email']")
            if len(inputs_email) >= 2:
                inputs_email[1].clear()
                inputs_email[1].send_keys(usuario["email"])
                time.sleep(0.5)
            
            # 4️⃣ Contraseña (4-10 caracteres)
            password_field = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
            password_field.clear()
            password_field.send_keys(usuario["password"])
            time.sleep(0.5)
            
            # 5️⃣ Confirmar contraseña (4-10 caracteres)
            password_fields = driver.find_elements(By.CSS_SELECTOR, "input[type='password']")
            if len(password_fields) >= 2:
                password_fields[1].clear()
                password_fields[1].send_keys(usuario["password"])
                time.sleep(0.5)
            
            # 6️⃣ Seleccionar Región
            region_select = driver.find_elements(By.CSS_SELECTOR, "select")[0]
            region_select.click()
            time.sleep(0.5)
            options = region_select.find_elements(By.TAG_NAME, "option")
            for option in options:
                if usuario["region"].lower() in option.text.lower():
                    option.click()
                    break
            time.sleep(0.5)
            
            # 7️⃣ Seleccionar Comuna
            comuna_select = driver.find_elements(By.CSS_SELECTOR, "select")[1]
            comuna_select.click()
            time.sleep(0.5)
            options = comuna_select.find_elements(By.TAG_NAME, "option")
            for option in options:
                if usuario["comuna"].lower() in option.text.lower():
                    option.click()
                    break
            time.sleep(0.5)
            
            # 8️⃣ Enviar formulario
            btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            btn.click()
            time.sleep(1)
            
            # ✅ ACEPTAR ALERTA DE GOOGLE si aparece
            try:
                alert = driver.switch_to.alert
                alert.accept()
                time.sleep(1)
            except:
                pass
            
            # Verificar si hay error
            try:
                alert = driver.switch_to.alert
                alert.accept()
                print(f"{usuario['nombre']:<30} {usuario['email']:<30} ❌ FALLO")
                registro_fallidos += 1
            except:
                print(f"{usuario['nombre']:<30} {usuario['email']:<30} ✅ REGISTRADO")
                registro_exitosos += 1
                
        except Exception as e:
            print(f"{usuario['nombre']:<30} {usuario['email']:<30} ❌ ERROR: {str(e)[:20]}")
            registro_fallidos += 1

    print("\n" + "="*80 + "\n")
    
    # ============================================================
    # PARTE 2: LOGIN CON USUARIOS REGISTRADOS
    # ============================================================
    print("🔓 PARTE 2: LOGIN CON USUARIOS REGISTRADOS\n")
    print(f"{'Usuario':<30} {'Email':<30} {'Estado':<20}")
    print("-" * 80)
    
    for usuario in usuarios:
        try:
            driver.get(URL_LOGIN)
            time.sleep(2)
            
            # Email
            email_login = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
            email_login.clear()
            email_login.send_keys(usuario["email"])
            time.sleep(0.5)
            
            # Contraseña
            password_login = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
            password_login.clear()
            password_login.send_keys(usuario["password"])
            time.sleep(0.5)
            
            # Enviar
            btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            btn.click()
            time.sleep(2)
            
            # ✅ ACEPTAR ALERTA DE GOOGLE si aparece
            try:
                alert = driver.switch_to.alert
                alert.accept()
                time.sleep(1)
            except:
                pass
            
            # Verificar error
            try:
                alert = driver.switch_to.alert
                alert.accept()
                print(f"{usuario['nombre']:<30} {usuario['email']:<30} ❌ FALLO")
                login_fallidos += 1
            except:
                current_url = driver.current_url
                if URL_LOGIN not in current_url:
                    print(f"{usuario['nombre']:<30} {usuario['email']:<30} ✅ LOGIN OK")
                    login_exitosos += 1
                else:
                    print(f"{usuario['nombre']:<30} {usuario['email']:<30} ❌ NO REDIRIGIDO")
                    login_fallidos += 1
                
        except Exception as e:
            print(f"{usuario['nombre']:<30} {usuario['email']:<30} ❌ ERROR: {str(e)[:20]}")
            login_fallidos += 1

finally:
    driver.quit()

# ============================================================
# REPORTE FINAL
# ============================================================
print("\n" + "="*80)
print("📊 REPORTE FINAL DE TESTS")
print("="*80)
print(f"\n📝 REGISTRO DE USUARIOS:")
print(f"   ✅ Exitosos: {registro_exitosos}/5")
print(f"   ❌ Fallidos:  {registro_fallidos}/5")
print(f"\n🔓 LOGIN DE USUARIOS:")
print(f"   ✅ Exitosos: {login_exitosos}/5")
print(f"   ❌ Fallidos:  {login_fallidos}/5")
print(f"\n🎯 TOTAL TESTS: {registro_exitosos + login_exitosos}/10")
print(f"📈 Tasa de éxito: {((registro_exitosos + login_exitosos) / 10 * 100):.1f}%")
print("="*80 + "\n")
