// Integration test for Base Color Editor
// This validates that the complete Base → Colors → Scopes workflow functions correctly

console.log('🧪 Studio1 Integration Test Starting...');

// Test 1: Verify base colors are properly synchronized
function testBaseColorSync() {
    const root = document.documentElement;
    const color1 = getComputedStyle(root).getPropertyValue('--color1').trim();
    const color2 = getComputedStyle(root).getPropertyValue('--color2').trim();
    const color3 = getComputedStyle(root).getPropertyValue('--color3').trim();
    const color4 = getComputedStyle(root).getPropertyValue('--color4').trim();
    
    console.log('✅ Base Colors:');
    console.log('  --color1:', color1);
    console.log('  --color2:', color2);
    console.log('  --color3:', color3);
    console.log('  --color4:', color4);
    
    return color1 && color2 && color3 && color4;
}

// Test 2: Verify color scales are available
function testColorScales() {
    const root = document.documentElement;
    const scales = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    const colors = ['color1', 'color2', 'color3', 'color4'];
    
    let allScalesPresent = true;
    
    colors.forEach(color => {
        scales.forEach(scale => {
            const value = getComputedStyle(root).getPropertyValue(`--${color}-${scale}`).trim();
            if (!value) {
                console.warn(`❌ Missing: --${color}-${scale}`);
                allScalesPresent = false;
            }
        });
    });
    
    if (allScalesPresent) {
        console.log('✅ All color scales (50-950) are present');
    }
    
    return allScalesPresent;
}

// Test 3: Verify Studio1 interface tabs are functional
function testInterfaceTabs() {
    const baseTab = document.querySelector('button[onclick*="setActiveTab(\'base\')"]') ||
                   document.querySelector('button:contains("Base")');
    const colorsTab = document.querySelector('button[onclick*="setActiveTab(\'colors\')"]') ||
                     document.querySelector('button:contains("Colors")');
    const scopesTab = document.querySelector('button[onclick*="setActiveTab(\'scopes\')"]') ||
                     document.querySelector('button:contains("Scopes")');
    
    console.log('✅ Interface Elements:');
    console.log('  Base tab found:', !!baseTab);
    console.log('  Colors tab found:', !!colorsTab);
    console.log('  Scopes tab found:', !!scopesTab);
    
    return baseTab && colorsTab && scopesTab;
}

// Test 4: Verify theme config is accessible
function testThemeConfig() {
    // Check if localStorage has theme config
    const themeConfig = localStorage.getItem('studio1-theme-config');
    const hasConfig = !!themeConfig;
    
    console.log('✅ Theme Configuration:');
    console.log('  localStorage config found:', hasConfig);
    
    if (hasConfig) {
        try {
            const config = JSON.parse(themeConfig);
            console.log('  Config has colors:', !!config.colors);
            console.log('  Config has components:', !!config.components);
            console.log('  Config has scopes:', !!config.scopes);
            return true;
        } catch (e) {
            console.warn('❌ Theme config JSON is invalid');
            return false;
        }
    }
    
    return false;
}

// Run all tests
function runIntegrationTests() {
    console.log('\n🔬 Running Studio1 Integration Tests...\n');
    
    const test1 = testBaseColorSync();
    const test2 = testColorScales();
    const test3 = testInterfaceTabs();
    const test4 = testThemeConfig();
    
    const allPassed = test1 && test2 && test3 && test4;
    
    console.log('\n📊 Test Results:');
    console.log('  Base Color Sync:', test1 ? '✅ PASS' : '❌ FAIL');
    console.log('  Color Scales:', test2 ? '✅ PASS' : '❌ FAIL');
    console.log('  Interface Tabs:', test3 ? '✅ PASS' : '❌ FAIL');
    console.log('  Theme Config:', test4 ? '✅ PASS' : '❌ FAIL');
    console.log('\n🎯 Overall Result:', allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
    
    return allPassed;
}

// Auto-run tests when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntegrationTests);
} else {
    setTimeout(runIntegrationTests, 1000); // Wait for React to render
}

// Export for manual testing
window.StudioIntegrationTest = {
    runTests: runIntegrationTests,
    testBaseColorSync,
    testColorScales,
    testInterfaceTabs,
    testThemeConfig
};